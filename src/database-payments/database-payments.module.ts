import { Module } from '@nestjs/common';
import { DatabasePaymentsService } from './database-payments.service';
import { DatabasePaymentsController } from './database-payments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [DatabasePaymentsController],
  providers: [DatabasePaymentsService],
})
export class DatabasePaymentsModule {}
