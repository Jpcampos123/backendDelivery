import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateDatabasePaymentDto } from './dto/create-database-payment.dto';
import { UpdateDatabasePaymentDto } from './dto/update-database-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatabasePaymentsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateDatabasePaymentDto) {
    try {
      const pay = await this.prismaService.payment_Order.create({
        data,
      });
      console.log(pay);
      return pay;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: e.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
        },
      );
    }
  }

  findAll() {
    return `This action returns all databasePayments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} databasePayment`;
  }

  update(id: number, updateDatabasePaymentDto: UpdateDatabasePaymentDto) {
    return `This action updates a #${id} databasePayment`;
  }

  remove(id: number) {
    return `This action removes a #${id} databasePayment`;
  }
}
