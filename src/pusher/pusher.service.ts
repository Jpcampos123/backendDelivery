import { Injectable } from '@nestjs/common';
import { CreatePusherDto } from './dto/create-pusher.dto';
import { UpdatePusherDto } from './dto/update-pusher.dto';
import * as Pusher from 'pusher';
@Injectable()
export class PusherService {
  private pusher = new Pusher({
    appId: '1637253',
    key: '5ef404ae72fb9d641074',
    secret: '2d80c0979e9d0e8ed022',
    cluster: 'sa1',
    useTLS: true,
  });

  triggerEvent(channel: string, event: string, data: any) {
    console.log(data);
    // return data;
    return this.pusher.trigger(channel, event, data);
  }

  findAll() {
    return `This action returns all pusher`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pusher`;
  }

  update(id: number, updatePusherDto: UpdatePusherDto) {
    return `This action updates a #${id} pusher`;
  }

  remove(id: number) {
    return `This action removes a #${id} pusher`;
  }
}
