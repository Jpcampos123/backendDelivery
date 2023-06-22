import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentMercadoPagoService } from './payment-mercado-pago.service';
import { CreatePaymentMercadoPagoDto } from './dto/create-payment-mercado-pago.dto';
import { UpdatePaymentMercadoPagoDto } from './dto/update-payment-mercado-pago.dto';
import { MercadoPagoService } from 'src/payment/payment.provider';

@Controller('payment-mercado-pago')
export class PaymentMercadoPagoController {
  constructor(
    private readonly paymentMercadoPagoService: PaymentMercadoPagoService,
    private readonly mercadoPagoService: MercadoPagoService,
  ) {}

  @Post()
  create(@Body() createPaymentMercadoPagoDto: CreatePaymentMercadoPagoDto) {
    return this.paymentMercadoPagoService.create(createPaymentMercadoPagoDto);
  }

  @Get()
  findAll() {
    return this.paymentMercadoPagoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mercadoPagoService.listPayment(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentMercadoPagoDto: UpdatePaymentMercadoPagoDto,
  ) {
    return this.paymentMercadoPagoService.update(
      +id,
      updatePaymentMercadoPagoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentMercadoPagoService.remove(+id);
  }
}
