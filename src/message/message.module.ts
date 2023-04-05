import { Module } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { MessageService } from './message.service';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [SocketModule],
  providers: [MessageRepository, MessageService],
  exports: [MessageService],
})
export class MessageModule {}
