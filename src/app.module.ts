import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { OrderModule } from './order/order.module';
import { ItemsModule } from './items/items.module';
import { PaymentModule } from './payment/payment.module';
import { ListpreferenceModule } from './listpreference/listpreference.module';
import { PaymentMercadoPagoModule } from './payment-mercado-pago/payment-mercado-pago.module';
import { DatabasePaymentsModule } from './database-payments/database-payments.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),

    CategoryModule,
    ProductModule,
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        auth: {
          user: 'jpcamposgda@hotmail.com',
          pass: 'P9kHXzEJQtDIpwVd',
        },
      },

      defaults: {
        from: '"JRJ Delivery" <jpcamposgda@hotmail.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    OrderModule,
    ItemsModule,
    PaymentModule,
    ListpreferenceModule,
    PaymentMercadoPagoModule,
    DatabasePaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
