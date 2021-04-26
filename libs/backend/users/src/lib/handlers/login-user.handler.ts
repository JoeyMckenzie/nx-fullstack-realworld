import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand, RegisterUserCommand } from '../commands';
import { PrismaService } from '@nx-fullstack-realworld/backend/common';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  isNullOrUndefined,
  UserLoginResponse,
} from '@nx-fullstack-realworld/shared';
import { AuthenticationService } from '../services/authentication.service';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  private readonly logger = new Logger(LoginUserHandler.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly authenticationService: AuthenticationService
  ) {}

  execute(command: LoginUserCommand): Promise<UserLoginResponse> {
    return from(
      this.prisma.users.findFirst({
        where: {
          email: command.email,
        },
      })
    )
      .pipe(
        map((existingUser) => {
          if (isNullOrUndefined(existingUser)) {
            throw new HttpException(
              { email: [`User with email ${command.email} does not exist`] },
              HttpStatus.NOT_FOUND
            );
          }

          this.logger.log(`Validating user account for ${command.email}`);
          const passwordIsValid = this.authenticationService.validatePassword(
            command.password,
            existingUser!.password!,
            existingUser!.salt!
          );

          if (!passwordIsValid) {
            throw new HttpException(
              {
                password: [
                  `User with email ${command.email} attempted to login with invalid password`,
                ],
              },
              HttpStatus.UNAUTHORIZED
            );
          }

          return {
            bio: existingUser!.bio,
            email: existingUser!.email,
            username: existingUser!.username,
            image: existingUser!.image,
            token: this.authenticationService.generateToken(
              existingUser!.id,
              existingUser!.username!,
              existingUser!.email
            ),
          } as UserLoginResponse;
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
