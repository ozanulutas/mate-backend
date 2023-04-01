import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { io, Socket } from 'socket.io-client';
import { EventEmitter } from './event-emitter';

@Injectable()
export class SocketClientProvider implements OnModuleInit {
  private socket: Socket;
  eventEmitter: EventEmitter;

  constructor(private config: ConfigService) {
    this.socket = io(this.config.get('SOCKET_URL'));
    this.eventEmitter = new EventEmitter(this.socket);
  }

  onModuleInit() {
    this.socket.on('connect', () => {
      console.log('Connected to socket');
    });
  }
}
