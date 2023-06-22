import { PartialType } from '@nestjs/mapped-types';
import { CreateListpreferenceDto } from './create-listpreference.dto';

export class UpdateListpreferenceDto extends PartialType(CreateListpreferenceDto) {}
