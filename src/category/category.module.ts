import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { PusherModule } from 'src/pusher/pusher.module';
import { PusherService } from 'src/pusher/pusher.service';

@Module({
  imports: [PrismaModule, AuthModule, PusherModule],
  controllers: [CategoryController],
  providers: [CategoryService, AuthGuard, PusherService],
})
export class CategoryModule {}
