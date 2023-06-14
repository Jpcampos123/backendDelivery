import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class MercadoPagoService {
  constructor() {
    // Configure Mercado Pago with your access token
    mercadopago.configure({
      access_token:
        'TEST-6201173609883364-112115-27ddfb7c2931c859bed9d4c1d05ed265-262243059',
    });
  }

  async createPreference(data: CreatePaymentDto[]): Promise<any> {
    const preference = {
      items: data,
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  //   async listPreference(res): Promise<any> {}
}
