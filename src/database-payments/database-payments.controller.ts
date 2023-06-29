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
  create(@Body() data: CreateDatabasePaymentDto) {
    return this.databasePaymentsService.create(data);
  }

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
