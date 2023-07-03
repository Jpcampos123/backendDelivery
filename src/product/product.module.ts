import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from 'src/file/file.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/guards/auth.guard';

@Module({
  imports: [PrismaModule, FileModule, AuthModule],
  controllers: [ProductController],
  providers: [ProductService, AuthGuard],
})
export class ProductModule {}
