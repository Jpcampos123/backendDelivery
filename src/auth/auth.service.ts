import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { hash } from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async create(data: CreateAuthDto) {
    if (!data.email) {
      throw new UnauthorizedException('E-mail e/ ou senha incorretos.');
    }

    const userAlreadyExists = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userAlreadyExists) {
      throw new UnauthorizedException('E-mail e/ ou senha incorretos.');
    }

    const passwordHash = await hash(data.password, 8);
    data.password = passwordHash;
    return await this.prisma.user.create({
      data,
    });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
