import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateDatabasePaymentDto } from './dto/create-database-payment.dto';
import { UpdateDatabasePaymentDto } from './dto/update-database-payment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DatabasePaymentsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(data: CreateDatabasePaymentDto) {
    return await this.prismaService.payment_Order.create({
      data,
    });
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
