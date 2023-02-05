import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  createMessage(createMessageDto: CreateMessageDto) {
    return this.messageRepository.createMessage(createMessageDto);
  }

  getUserChats(userId: number) {
    return this.messageRepository.getUserChats(userId);
  }

  getUserChat(userId: number, peerId: number) {
    return this.messageRepository.getUserChat(userId, peerId);
  }
}
