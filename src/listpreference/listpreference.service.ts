import { Injectable } from '@nestjs/common';
import { CreateListpreferenceDto } from './dto/create-listpreference.dto';
import { UpdateListpreferenceDto } from './dto/update-listpreference.dto';

@Injectable()
export class ListpreferenceService {
  create(createListpreferenceDto: CreateListpreferenceDto) {
    return 'This action adds a new listpreference';
  }

  findAll() {
    return `This action returns all listpreference`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listpreference`;
  }

  update(id: number, updateListpreferenceDto: UpdateListpreferenceDto) {
    return `This action updates a #${id} listpreference`;
  }

  remove(id: number) {
    return `This action removes a #${id} listpreference`;
  }
}
