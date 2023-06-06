import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}
  async createOrder(data: CreateOrderDto) {
    if (!data.name) {
      throw new UnauthorizedException('Houve Algum problema com seu login');
    }

    if (data.name) {
      await this.prismaService.order.create({
        data: {
          name: data.name,
          user_id: data.id,
        },
      });
    }
    return true;
  }

  async findAll(data) {
    const orders = await this.prismaService.order.findMany({
      where: {
        user_id: data.id,
      },
    });
    if (!orders) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não existem Pedidos',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
        },
      );
    }
    return { orders };
  }

  async findOne(id: string) {
    const order = await this.prismaService.order.findUnique({
      where: {
        id,
      },
    });
    if (!order) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Não existem Pedidos',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
        },
      );
    }
    return { order };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
