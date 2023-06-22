import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MercadoPagoService } from './payment.provider';

@Controller('create_preference')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly mercadoPagoService: MercadoPagoService,
  ) {}

  @Post()
  async create(@Body() data: CreatePaymentDto): Promise<CreatePaymentDto> {
    try {
      const preferenceId = await this.mercadoPagoService.createPreference(data);
      return preferenceId;
    } catch (e) {
      throw e;
    }

    // return this.mercadoPagoService.createPreference(data);
  }

  @Get('feedback')
  async findAll(@Req() req, @Res() res) {
    return res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });
  }

  @Get(':id')
  listPreference(@Param('id') id: string) {
    return this.mercadoPagoService.listPreference(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
