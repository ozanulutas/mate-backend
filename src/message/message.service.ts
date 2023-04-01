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

  getUserChatMessages(userId: number, peerId: number) {
    return this.messageRepository.getUserChatMessages(userId, peerId);
  }

  async getUnreadChatInfo(userId: number) {
    const result = await this.messageRepository.getUnreadChatInfo(userId);

    return result.map(({ _count: { senderId: _count }, senderId, text }) => ({
      senderId,
      text,
      _count,
    }));
  }

  updateMessagesAsRead(receiverId: number, peerId: number) {
    return this.messageRepository.updateMessagesAsRead(receiverId, peerId);
  }
}
