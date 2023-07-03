import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderService } from 'src/order/order.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [ItemsController],
  providers: [ItemsService, OrderService, AuthGuard],
})
export class ItemsModule {}
