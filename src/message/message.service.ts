import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = await this.messageRepository.createMessage(
      createMessageDto,
    );
    const {
      receivers: [receiver],
      ...rest
    } = message;

    return { ...rest, ...receiver };
  }

  getUserChats(userId: number) {
    return this.messageRepository.getUserChats(userId);
  }

  getUserChat(userId: number, peerId: number) {
    return this.messageRepository.getUserChat(userId, peerId);
  }

  getUnreadChatInfo(userId: number) {
    return this.messageRepository.getUnreadChatInfo(userId);
  }
}
