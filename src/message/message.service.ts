import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto';
import { MessageRepository } from './message.repository';
import { SocketClientProvider } from 'src/socket/socket-client.provider';

@Injectable()
export class MessageService {
  constructor(
    private messageRepository: MessageRepository,
    private socketClient: SocketClientProvider,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    const message = await this.messageRepository.createMessage(
      createMessageDto,
    );
    const {
      receivers: [receiver],
      ...rest
    } = message;
    const payload = { ...rest, ...receiver };

    this.socketClient.eventEmitter.newMessage(payload);

    return payload;
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
