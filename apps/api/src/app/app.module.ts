import { MiddlewareConsumer, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BackendUsersModule } from '@nx-fullstack-realworld/backend/users';

@Module({
  imports: [BackendUsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
