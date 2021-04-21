import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BackendUsersModule } from '@nx-fullstack-realworld/backend/users';

@Module({
  imports: [BackendUsersModule, ConfigModule.forRoot()],
})
export class AppModule {}
