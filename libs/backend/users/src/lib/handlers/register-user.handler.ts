import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../commands';
import { PrismaService } from '@nx-fullstack-realworld/backend/common';
import { Logger } from '@nestjs/common';
import { from } from 'rxjs';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand> {
  private readonly logger = new Logger(RegisterUserHandler.name);

  constructor(private readonly prisma: PrismaService) {}

  execute(command: RegisterUserCommand): Promise<any> {
    return from(
      this.prisma.user.create({
        data: {
          username: command.username,
          email: command.email,
          password: command.password,
        },
      })
    ).toPromise();
  }
}
