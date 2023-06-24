import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class OrderCheckGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.body.Headers.Authorization;

    try {
      // console.log(token);
      const data = await this.authService.checkToken(
        (token ?? '').split(' ')[1],
      );
      request.tokenPayload = data;

      //   console.log(request);

      //   request.user = await this.authService.findOne(data.id);
      return true;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: e.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: new Error(),
        },
      );
    }
  }
}
