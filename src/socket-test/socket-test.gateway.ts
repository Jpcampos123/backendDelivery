import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { SocketTestService } from './socket-test.service';
import { CreateSocketTestDto } from './dto/create-socket-test.dto';
import { UpdateSocketTestDto } from './dto/update-socket-test.dto';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';

import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketTestGateway {
  constructor(
    private readonly socketTestService: SocketTestService,
    private readonly prismaService: PrismaService,
  ) {}
  @WebSocketServer()
  server: Server;
  @SubscribeMessage('send_message')
  async listenForMessages(@MessageBody() data: CreateCategoryDto) {
    if (!data) {
      return;
    }

    const create = await await this.prismaService.category.create({
      data,
    });

    if (!create) {
      {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Algo deu errado',
          },
          HttpStatus.FORBIDDEN,
          {
            cause: new Error(),
          },
        );
      }
    }

    const findAll = await this.prismaService.category.findMany();

    Logger.log(findAll);
    this.server.sockets.emit('receive_message', findAll);

    return create;

    // @SubscribeMessage('socketTest')
    // async socketTest(@MessageBody() data: CreateCategoryDto) {
    //   Logger.log(data);

    //   if (!data) {
    //     return;
    //   }

    //   const create = await this.prismaService.category.create({
    //     data,
    //   });

    //   return this.prismaService.category.findMany();
    // return this.socketTestService.create(data);
  }

  @SubscribeMessage('findAllSocketTest')
  findAll() {
    Logger.log('1');
    return this.prismaService.category.findMany();
  }

  @SubscribeMessage('findOneSocketTest')
  findOne(@MessageBody() id: number) {
    return this.socketTestService.findOne(id);
  }

  @SubscribeMessage('updateSocketTest')
  update(@MessageBody() updateSocketTestDto: UpdateSocketTestDto) {
    return this.socketTestService.update(
      updateSocketTestDto.id,
      updateSocketTestDto,
    );
  }

  @SubscribeMessage('removeSocketTest')
  remove(@MessageBody() id: number) {
    return this.socketTestService.remove(id);
  }
}
