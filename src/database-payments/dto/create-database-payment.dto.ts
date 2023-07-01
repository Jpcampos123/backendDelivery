import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDatabasePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
  @IsNumber()
  total_paid_amount: number;

  @IsNotEmpty()
  @IsString()
  order_id: string;
}
