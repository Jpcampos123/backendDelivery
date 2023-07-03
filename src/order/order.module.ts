import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { OrderCheckGuard } from 'src/guards/orderCheckToken.guard';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [OrderController],
  providers: [OrderService, OrderCheckGuard],
})
export class OrderModule {}
