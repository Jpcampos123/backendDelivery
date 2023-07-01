import { IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateDatabasePaymentDto {
  @IsNotEmpty()
  @IsNumberString()
  id: string;

  @IsNotEmpty()
  @IsString()
  status_payment: string;

  @IsOptional()
  @IsString()
  name_payer: string;

  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @IsNotEmpty()
  @IsNumberString()
  total_paid_amount: string;

  @IsNotEmpty()
  @IsString()
  order_id: string;
}
