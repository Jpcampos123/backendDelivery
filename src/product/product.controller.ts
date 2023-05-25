import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { join } from 'path';
import { query } from 'express';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly fileService: FileService,
  ) {}

  @UseInterceptors(FileInterceptor('banner'))
  @Post()
  create(
    @Body() data: CreateProductDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'produto',
      `${data.name}${data.category_id}.png`,
    );

    data.banner = `${data.name}${data.category_id}.png`;
    return (
      this.productService.create(data) && this.fileService.upload(photo, path)
    );
  }

  // @Post('photo')
  // async uploadPhoto(data:)

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Delete()
  deleteAll() {
    return this.productService.deleteAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Get('category/products')
  async findByCategory(@Query('category_id') category_id: string) {
    return this.productService.findByCategory(category_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
