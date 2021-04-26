import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../../commands';
import { PrismaService } from '@nx-fullstack-realworld/backend/common';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  isNullOrUndefined,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';
import { AuthenticationService } from '../../services/authentication.service';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand> {
  private readonly logger = new Logger(RegisterUserHandler.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly authenticationService: AuthenticationService
  ) {}

  execute(command: RegisterUserCommand): Promise<UserRegistrationResponse> {
    return from(
      this.prisma.users.findFirst({
        where: {
          email: command.email,
        },
      })
    )
      .pipe(
        mergeMap((existingUser) => {
          if (!isNullOrUndefined(existingUser)) {
            throw new HttpException(
              { email: [`User with email ${command.email} already exists`] },
              HttpStatus.BAD_REQUEST
            );
          }

          this.logger.log(`Creating user account for ${command.email}`);

          const {
            password,
            salt,
          } = this.authenticationService.generateHashedPasswordWithSalt(
            command.password
          );

          return from(
            this.prisma.users.create({
              data: {
                username: command.username,
                email: command.email,
                password,
                salt,
              },
            })
          ).pipe(
            map((user) => {
              return {
                username: user.username,
                email: user.email,
                bio: user.bio,
                image: user.image,
                token: this.authenticationService.generateToken(
                  user.id,
                  user.username!,
                  user.email
                ),
              } as UserRegistrationResponse;
            })
          );
        }),
        catchError((error) => {
          this.logger.error(`Error while creating user ${command.email}`);
          this.logger.error(error);
          throw error;
        })
      )
      .toPromise();
  }
}
