import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentMercadoPagoDto } from './create-payment-mercado-pago.dto';

export class UpdatePaymentMercadoPagoDto extends PartialType(CreatePaymentMercadoPagoDto) {}
