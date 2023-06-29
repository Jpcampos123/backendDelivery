import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDatabasePaymentDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  status_payment: string;

  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @IsNotEmpty()
  @IsNumber()
  total_paid_amount: number;

  @IsNotEmpty()
  @IsString()
  item_id: string;
}
