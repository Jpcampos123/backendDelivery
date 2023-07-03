import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
// import { ItemGuard } from 'src/guards/item.guard';

@Injectable()
export class ItemsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateItemDto[]) {
    const item = await this.prismaService.item.createMany({
      data,
    });

    if (!item) {
      throw new UnauthorizedException('Item não criado');
    }
    return { item };
  }

  findAll() {
    return this.prismaService.item.findMany();
  }

  async findOne(id: string) {
    const item = await this.prismaService.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Item não encontrado',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
        },
      );
    }

    return { item };
  }

  async findByOrder(order_id: string) {
    return await this.prismaService.item.findMany({
      where: { order_id },
    });
  }

  async update(id: string, data: UpdateItemDto) {
    const findItem = await this.prismaService.item.findUnique({
      where: { id },
    });

    if (!findItem) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Item não encontrado',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
        },
      );
    }

    const item = await this.prismaService.item.update({
      data,
      where: { id },
    });

    return { item };
  }

  async remove(id: string) {
    return await this.prismaService.item.delete({
      where: { id },
    });
  }
}
