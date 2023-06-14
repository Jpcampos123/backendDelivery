import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MercadoPagoService } from './payment.provider';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, MercadoPagoService],
})
export class PaymentModule {}
