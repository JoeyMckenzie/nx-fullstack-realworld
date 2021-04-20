import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      this.logger.log('Creating Prisma client instance...');
      await this.$connect();
      this.logger.log('Prisma successfully initialized!');
    } catch (e) {
      this.logger.log('Prisma failed to initialize!');
      this.logger.error(e);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
