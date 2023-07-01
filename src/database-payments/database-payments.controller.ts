import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DatabasePaymentsService } from './database-payments.service';
import { CreateDatabasePaymentDto } from './dto/create-database-payment.dto';
import { UpdateDatabasePaymentDto } from './dto/update-database-payment.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('database-payments')
export class DatabasePaymentsController {
  constructor(
    private readonly databasePaymentsService: DatabasePaymentsService,
  ) {}

  @Post()
  async create(@Body() data: CreateDatabasePaymentDto) {
    return await this.databasePaymentsService.create(data);
  }

  // {
  //   "id": "262243059", 
  //   "status_payment": "pending", 
  //   "name_payer": null,
  //   "payment_method": "bank_transfer",
  //   "total_paid_amount": 30,
  //   "order_id": "35c524d8-9b71-4422-935d-9e17da188b12"
    
  // }

  @Get()
  findAll() {
    return this.databasePaymentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.databasePaymentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDatabasePaymentDto: UpdateDatabasePaymentDto,
  ) {
    return this.databasePaymentsService.update(+id, updateDatabasePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.databasePaymentsService.remove(+id);
  }
}
