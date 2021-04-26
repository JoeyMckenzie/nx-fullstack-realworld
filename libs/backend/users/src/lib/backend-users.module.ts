import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BackendCommonModule } from '@nx-fullstack-realworld/backend/common';

import { BackendUsersController } from './controllers/backend-users.controller';
import { LoginUserHandler, RegisterUserHandler } from './handlers';
import { AuthenticationService } from './services/authentication.service';

@Module({
  imports: [CqrsModule, BackendCommonModule],
  controllers: [BackendUsersController],
  providers: [RegisterUserHandler, LoginUserHandler, AuthenticationService],
})
export class BackendUsersModule {}
