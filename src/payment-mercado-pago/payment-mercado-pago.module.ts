import { Module } from '@nestjs/common';
import { PaymentMercadoPagoService } from './payment-mercado-pago.service';
import { PaymentMercadoPagoController } from './payment-mercado-pago.controller';
import { PaymentModule } from 'src/payment/payment.module';
import { MercadoPagoService } from 'src/payment/payment.provider';

@Module({
  imports: [PaymentModule],
  controllers: [PaymentMercadoPagoController],
  providers: [PaymentMercadoPagoService, MercadoPagoService],
})
export class PaymentMercadoPagoModule {}
