import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';
import { from, Observable } from 'rxjs';
import { RegisterUserCommand } from '../commands';

@Controller('users')
export class BackendUsersController {
  private readonly logger = new Logger(BackendUsersController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  registerUser(
    @Body() userRegistrationRequest: UserRegistrationRequest
  ): Observable<UserRegistrationResponse> {
    this.logger.log(
      `Received user registration request for ${userRegistrationRequest.email}`
    );

    const { username, email, password } = userRegistrationRequest;

    return from(
      this.commandBus.execute(
        new RegisterUserCommand(email, username, password)
      )
    );
  }
}
