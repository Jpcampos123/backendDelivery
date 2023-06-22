import { Injectable, NotFoundException } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class MercadoPagoService {
  constructor() {
    // Configure Mercado Pago with your access token
    mercadopago.configure({
      //   access_token:
      //     'APP_USR-6201173609883364-112115-6e46120416ea3877e9f321a9cafa1e5f-262243059',
      // });

      access_token:
        'TEST-6201173609883364-112115-27ddfb7c2931c859bed9d4c1d05ed265-262243059',
    });
  }

  async createPreference(data: CreatePaymentDto): Promise<any> {
    // const preference = {
    //   items: data,
    // };

    try {
      const response = await mercadopago.preferences.create(data);
      return response.body;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async listPreference(id: string): Promise<any> {
    try {
      const response = await mercadopago.preferences.get(id);

      return response.body;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async listPayment(id: string): Promise<any> {
    try {
      const response = await mercadopago.payment.get(id);
      return response.body;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //   async listPreference(res): Promise<any> {}
}
