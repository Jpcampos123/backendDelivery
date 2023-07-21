import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
// import { OrderGuard } from 'src/guards/order.guard';
import { OrderCheckGuard } from 'src/guards/orderCheckToken.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { PusherService } from 'src/pusher/pusher.service';

@Controller('order')
@UseGuards(AuthGuard)
// @UseGuards(OrderCheckGuard)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly pusherService: PusherService,
  ) {}

  @Post()
  async createOrder(@Req() req) {
    const order = await this.orderService.createOrder(req.tokenPayload);
    if (!order) return;

    // console.log(data);
    const pusherService = await this.pusherService.triggerEvent(
      'my-channel',
      'my-event',
      { message: true },
    );
    if (!pusherService) return;
    // console.log(pusherService);
    return order;
  }

  // @Post('add')
  // addItem(@Body() data: CreateOrderDto) {
  //   return this.orderService.addItem(data);
  // }

  @Get()
  findAll(@Req() req) {
    return this.orderService.findAll(req.tokenPayload);
  }

  @Get('/findAllOrders')
  async findAllOrders(@Req() req) {
    return await this.orderService.findAllOrders();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }
  // @UseGuards(OrderGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }

  @Patch(':id')
  updateDraft(@Param('id') id: string, @Body() data: UpdateOrderDto) {
    return this.orderService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
