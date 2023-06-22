import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListpreferenceService } from './listpreference.service';
import { CreateListpreferenceDto } from './dto/create-listpreference.dto';
import { UpdateListpreferenceDto } from './dto/update-listpreference.dto';
import { MercadoPagoService } from 'src/payment/payment.provider';

@Controller('listpreference')
export class ListpreferenceController {
  constructor(
    private readonly listpreferenceService: ListpreferenceService,
    private readonly mercadoPagoService: MercadoPagoService,
  ) {}

  @Post()
  create(@Body() createListpreferenceDto: CreateListpreferenceDto) {
    return this.listpreferenceService.create(createListpreferenceDto);
  }

  @Get()
  findAll() {
    return this.listpreferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mercadoPagoService.listPreference(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateListpreferenceDto: UpdateListpreferenceDto,
  ) {
    return this.listpreferenceService.update(+id, updateListpreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listpreferenceService.remove(+id);
  }
}
