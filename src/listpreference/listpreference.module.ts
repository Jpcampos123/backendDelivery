import { Module } from '@nestjs/common';
import { ListpreferenceService } from './listpreference.service';
import { ListpreferenceController } from './listpreference.controller';
import { PaymentModule } from 'src/payment/payment.module';

import { MercadoPagoService } from 'src/payment/payment.provider';

@Module({
  imports: [PaymentModule],
  controllers: [ListpreferenceController],
  providers: [ListpreferenceService, MercadoPagoService],
})
export class ListpreferenceModule {}
