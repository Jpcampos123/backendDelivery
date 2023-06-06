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
  UseGuards,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from 'src/file/file.service';
import { join } from 'path';

import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly fileService: FileService,
  ) {}

  @UseInterceptors(FileInterceptor('banner'))
  @Post()
  create(
    @Body() data: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/png' }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 100 }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    const myuuid = uuidv4();
    const path = join(
      __dirname,
      '..',
      '..',
      'client',

      `${myuuid}${data.category_id}.png`.replace(/\s+/g, '-'),
    );
    //
    data.banner = `${myuuid}${data.category_id}.png`.replace(/\s+/g, '-');
    return (
      this.productService.create(data) && this.fileService.upload(photo, path)
    );
  }

  @UseInterceptors(FileInterceptor('banner'))
  @Patch(':id')
  async update(
    @Body() data: UpdateProductDto,
    @Param('id') id: string,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    const myuuid = uuidv4();
    const path = join(
      __dirname,
      '..',
      '..',
      'client',

      `${myuuid}${data.category_id}.png`.replace(/\s+/g, '-'),
    );
    //
    data.banner = `${myuuid}${data.category_id}.png`.replace(/\s+/g, '-');
    return (
      this.productService.update(id, data) &&
      this.fileService.upload(photo, path)
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

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body() data: UpdateProductDto) {
  //   return this.productService.update(id, data);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
