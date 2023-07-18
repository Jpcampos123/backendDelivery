import { Module } from '@nestjs/common';
import { SocketTestService } from './socket-test.service';
import { SocketTestGateway } from './socket-test.gateway';
import { CategoryModule } from 'src/category/category.module';
import { CategoryService } from 'src/category/category.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  providers: [SocketTestGateway, SocketTestService, PrismaService],
})
export class SocketTestModule {}
