import { PartialType } from '@nestjs/mapped-types';
import { CreateDatabasePaymentDto } from './create-database-payment.dto';

export class UpdateDatabasePaymentDto extends PartialType(CreateDatabasePaymentDto) {}
