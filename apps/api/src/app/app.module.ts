import { MiddlewareConsumer, Module } from '@nestjs/common';

import { BackendUsersModule } from '@nx-fullstack-realworld/backend/users';

@Module({
  imports: [BackendUsersModule],
})
export class AppModule {}
