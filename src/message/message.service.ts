import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  getUserChats(userId: number) {
    return this.messageRepository.getUserChats(userId);
  }

  getUserChat(userId: number, peerId: number) {
    return this.messageRepository.getUserChat(userId, peerId);
  }
}
