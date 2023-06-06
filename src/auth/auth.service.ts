import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import { compare, hash } from 'bcryptjs';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { User } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailer: MailerService,
  ) {}

  async createToken(user: User) {
    return this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '30 days',
        subject: user.id,
        issuer: 'login',
        audience: 'users',
      },
    );
  }
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
    await this.prisma.user.create({
      data,
    });
    return { Success: true };
  }

  async login(data: VerifyAuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail e/ ou senha incorretos.');
    }

    const passwordMatch = await compare(data.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('E-mail e/ ou senha incorretos.');
    }

    const token = await this.createToken(user);

    // gerar token
    // const token = sign(
    //   {
    //     name: user.name,
    //     email: user.email,
    //   },
    //   process.env.JWT_SECRET,
    //   {
    //     subject: user.id,
    //     expiresIn: '30d',
    //   },
    // );

    return { id: user.id, name: user.name, email: user.email, token: token };
  }

  async checkToken(token: string) {
    try {
      const data = await this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findOne(id: string) {
    const data = await this.prisma.user.findUnique({
      where: { id },
    });

    return { id: data.id, name: data.name, email: data.email };
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail está incorreto');
    }

    const token = await this.createToken(user);

    await this.mailer.sendMail({
      subject: 'Recuperação de E-mail',
      to: user.email,
      template: 'forget',
      context: {
        name: user.name,
        token: token,
      },
    });
    return true;
  }
}
