import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

import { OrderCheckGuard } from 'src/guards/orderCheckToken.guard';
import { PusherModule } from 'src/pusher/pusher.module';
import { PusherService } from 'src/pusher/pusher.service';

@Module({
  imports: [AuthModule, PrismaModule, PusherModule],
  controllers: [OrderController],
  providers: [OrderService, OrderCheckGuard, PusherService],
})
export class OrderModule {}
