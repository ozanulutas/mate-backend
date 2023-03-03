import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class SoketClientProvider implements OnModuleInit {
  public socket: Socket;

  constructor(private config: ConfigService) {
    this.socket = io(config.get('SOCKET_URL'));
  }

  onModuleInit() {
    this.socket.on('connect', () => {
      console.log('Connected to socket');
    });
  }
}
