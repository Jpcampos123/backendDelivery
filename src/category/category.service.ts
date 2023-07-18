import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return await this.prisma.category.create({
      data,
    });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.category.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      data,
      where: { id },
    });

    if (!category) {
      {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Categoria Não Encontrada',
          },
          HttpStatus.FORBIDDEN,
          {
            cause: new Error(),
          },
        );
      }
    }
    return { category };
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
