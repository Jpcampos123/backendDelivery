import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
// import { ItemGuard } from 'src/guards/item.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('items')
@UseGuards(AuthGuard)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  create(@Body() data: CreateItemDto[]) {
    return this.itemsService.create(data);
    // return console.log(data);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemsService.findOne(id);
  }

  // @UseGuards(ItemGuard)
  @Get('order/item')
  async findByOrder(@Query('order_id') order_id: string) {
    return await this.itemsService.findByOrder(order_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateItemDto) {
    return this.itemsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemsService.remove(id);
  }
}
