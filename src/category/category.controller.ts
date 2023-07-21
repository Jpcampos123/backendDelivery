import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PusherService } from 'src/pusher/pusher.service';

@Controller('category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly pusherService: PusherService,
  ) {}

  @Post()
  async create(@Body() data: CreateCategoryDto) {
    const category = await this.categoryService.create(data);
    if (!category) return;
    const find = await this.findAll();
    if (!find) return;
    const pusherService = await this.pusherService.triggerEvent(
      'my-channel',
      'my-event',
      find,
    );
    if (!pusherService) return;

    return category;
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    return this.categoryService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
