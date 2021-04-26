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
  UserLoginResponse,
  UserRegistrationRequest,
  UserRegistrationResponse,
} from '@nx-fullstack-realworld/shared';
import { from, Observable } from 'rxjs';
import { LoginUserCommand, RegisterUserCommand } from '../commands';
import { LoginRequest, RegistrationRequest } from '../models';

@Controller('users')
export class BackendUsersController {
  private readonly logger = new Logger(BackendUsersController.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  registerUser(
    @Body() userRegistrationRequest: RegistrationRequest
  ): Observable<UserRegistrationResponse> {
    this.logger.log(
      `Received user registration request for ${userRegistrationRequest.user.email}`
    );

    const { username, email, password } = userRegistrationRequest.user;

    return from(
      this.commandBus.execute(
        new RegisterUserCommand(email, username, password)
      )
    );
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  loginUser(
    @Body() userLoginRequest: LoginRequest
  ): Observable<UserLoginResponse> {
    this.logger.log(
      `Received user registration request for ${userLoginRequest.user.email}`
    );

    const { email, password } = userLoginRequest.user;

    return from(
      this.commandBus.execute(
        new LoginUserCommand(email, password)
      )
    );
  }
}
