import { Message, User } from '@prisma/client';

export interface Chat {
  text: string;
  userId: number;
  username: string;
}

export interface ChatMessage
  extends Pick<Message, 'id' | 'text' | 'createdAt'> {
  receiver: Pick<User, 'id' | 'username'>;
  sender: Pick<User, 'id' | 'username'>;
}
