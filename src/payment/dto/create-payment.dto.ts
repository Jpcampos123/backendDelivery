import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class ItemsDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  unit_price: number;
}

export class PayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsObject()
  phone: object;
}

export class Back_urlsDto {
  @IsNotEmpty()
  @IsString()
  success: string;

  @IsNotEmpty()
  @IsString()
  failure: string;

  @IsNotEmpty()
  @IsString()
  pending: string;
}

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsArray()
  items: ItemsDto[];

  @IsNotEmpty()
  @IsObject()
  payer: PayerDto;

  @IsNotEmpty()
  @IsObject()
  back_urls: Back_urlsDto;

  // @IsNotEmpty()
  // @IsString()
  // notification_url: string;

  @IsNotEmpty()
  @IsString()
  auto_return: string;

  @IsNotEmpty()
  @IsString()
  product_id: string;
}
