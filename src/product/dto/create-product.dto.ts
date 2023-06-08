import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumberString()
  price: string;

  @IsOptional()
  @IsNumberString()
  serve: string;

  @IsOptional()
  @IsString()
  description: string;

  banner: string;

  @IsNotEmpty()
  @IsString()
  category_id: string;
}
