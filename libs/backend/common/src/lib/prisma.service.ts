import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { from } from 'rxjs';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(PrismaService.name);

  constructor() {
    super();
  }

  onModuleInit() {
    try {
      this.logger.log('Creating Prisma client instance...');
      from(this.$connect());
      this.logger.log('Prisma successfully initialized!');
    } catch (e) {
      this.logger.log('Prisma failed to initialize!');
      this.logger.error(e);
    }
  }

  onModuleDestroy() {
    from(this.$disconnect());
  }
}
