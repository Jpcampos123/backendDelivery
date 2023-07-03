import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService, AuthGuard],
})
export class CategoryModule {}
