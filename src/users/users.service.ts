import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { compare, hash } from 'bcryptjs';
import { UserDTO } from './dto/user.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDTO) {
    if (!data.email) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const userAlreadyExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const passwordHash = await hash(data.password, 8);
    data.password = passwordHash;
    return await this.prisma.user.create({
      data,
    });
  }

  async login(data: UserDTO) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const passwordMatch = await compare(data.password, user.password);
    if (!passwordMatch) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    // gerar token
    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d',
      },
    );
    return { id: user.id, name: user.name, email: user.email, token: token };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
