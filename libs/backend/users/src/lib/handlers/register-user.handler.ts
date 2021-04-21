import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../commands';
import { PrismaService } from '@nx-fullstack-realworld/backend/common';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, switchMap, take } from 'rxjs/operators';
import {
  isNullOrUndefined,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand> {
  private readonly logger = new Logger(RegisterUserHandler.name);

  constructor(private readonly prisma: PrismaService) {}

  private handleUserCreationError(
    command: RegisterUserCommand,
    error: any
  ): ReturnType<typeof catchError> {
    this.logger.error(`Error while creating user ${command.email}`);
    this.logger.error(error);
    throw new HttpException(
      `An error has occurred while creating user ${command.email}`,
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  execute(command: RegisterUserCommand): Promise<UserRegistrationResponse> {
    return from(
      this.prisma.users.findFirst({
        where: {
          email: command.email,
        },
      })
    )
      .pipe(
        take(1),
        catchError((error) => this.handleUserCreationError(command, error)),
        switchMap((existingUser) => {
          if (!isNullOrUndefined(existingUser)) {
            throw new HttpException(
              `User with email ${command.email} already exists`,
              HttpStatus.BAD_REQUEST
            );
          }

          this.logger.log(`Creating user account for ${command.email}`);
          return from(
            this.prisma.users.create({
              data: {
                username: command.username,
                email: command.email,
                password: command.password,
              },
            })
          ).pipe(
            take(1),
            catchError((error) => this.handleUserCreationError(command, error)),
            exhaustMap((user) => {
              return of({
                username: user.username,
                email: user.email,
                bio: user.bio,
                image: user.email,
              } as UserRegistrationResponse);
            })
          );
        })
      )
      .toPromise();
  }
}
