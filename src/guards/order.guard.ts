import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { OrderService } from 'src/order/order.service';

@Injectable()
export class OrderGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly orderService: OrderService,
  ) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // const { authorization } = request.headers;

    try {
      const order = await this.orderService.findOne(request.params.id);

      // const data = await authorization.split(' ')[1];

      // console.log(
      //   request.tokenPayload.id,
      //   '--------------------------------',
      //   order.order.user_id,
      // );
      // console.log(order.order.user_id);

      //   request.user = await this.authService.findOne(data.id);
      return request.tokenPayload.id == order.order.user_id;
    } catch (e) {
      throw new UnauthorizedException(e);
    }

    // try {
    //   const data: any = this.authService.checkToken(
    //     (request.authorization ?? '').split(' ')[1],
    //   );

    //   request.tokenPayload = data;

    //   request.user = this.authService.findOne(data.id);

    //   console.log(data.id);
    //   return true;
    // } catch (e) {
    //   return false;
    // }
  }
}
