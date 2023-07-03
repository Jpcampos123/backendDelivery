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

@Controller('order')
// @UseGuards(AuthGuard)
@UseGuards(OrderCheckGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Req() req) {
    return this.orderService.createOrder(req.tokenPayload);
    // return req.tokenPayload;
  }

  // @Post('add')
  // addItem(@Body() data: CreateOrderDto) {
  //   return this.orderService.addItem(data);
  // }

  @Get()
  findAll(@Req() req) {
    return this.orderService.findAll(req.tokenPayload);
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
