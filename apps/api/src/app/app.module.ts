import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { BackendUsersModule } from '@nx-fullstack-realworld/backend/users';
import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [BackendUsersModule, ConfigModule.forRoot()],
  providers: [
    {
      provide: APP_FILTER,
      useValue: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
