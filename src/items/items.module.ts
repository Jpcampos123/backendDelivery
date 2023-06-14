import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderService } from 'src/order/order.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [ItemsController],
  providers: [ItemsService, OrderService],
})
export class ItemsModule {}
