import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto';
import { Chat, ChatMessage } from './message';

@Injectable()
export class MessageRepository {
  constructor(private prisma: PrismaService) {}

  createMessage({ receiverId, senderId, text }: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        senderId,
        text,
        receivers: {
          create: [
            {
              receiverId,
            },
          ],
        },
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
        receivers: {
          select: {
            receiver: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
  }

  // @TODO: optimize?
  getUserChats(userId: number) {
    return this.prisma.$queryRaw<Chat[]>`
      SELECT
        DISTINCT ON(u.id) u.id "userId",
        u.username,
        --mr.is_read "isRead"
        m."text"
      FROM
        message m JOIN message_receiver mr ON m.id = mr.message_id
        JOIN "user" u ON mr.receiver_id = u.id OR m.sender_id = u.id
      WHERE
        ${userId} IN (m.sender_id, mr.receiver_id) AND u.id != ${userId}
      ORDER BY u.id, m.created_at DESC;
    `;
  }

  getUserChatMessages(userId: number, peerId: number) {
    return this.prisma.$queryRaw<ChatMessage[]>`
      SELECT
        m.id,
        m."text",
        mr.is_read "isRead",
        JSON_BUILD_OBJECT('id', mr.receiver_id, 'username', u2.username) receiver,
	      JSON_BUILD_OBJECT('id', m.sender_id, 'username', u.username) sender,
        m.created_at "createdAt"
      FROM
        message m JOIN message_receiver mr ON m.id = mr.message_id
        JOIN "user" u ON m.sender_id = u.id
        JOIN "user" u2 ON mr.receiver_id = u2.id
      WHERE
        (m.sender_id = ${userId} AND mr.receiver_id = ${peerId})
        OR (m.sender_id = ${peerId} AND mr.receiver_id = ${userId})
      ORDER BY m.created_at;
    `;
  }

  getUnreadChatInfo(userId: number) {
    return this.prisma.message.groupBy({
      by: ['senderId', 'text'],
      _count: {
        senderId: true,
      },
      where: {
        receivers: {
          some: {
            isRead: false,
            receiverId: userId,
          },
        },
      },
    });
  }

  updateMessagesAsRead(receiverId: number, senderId: number) {
    return this.prisma.messageReceiver.updateMany({
      where: {
        isRead: false,
        receiverId,
        message: {
          senderId,
        },
      },
      data: {
        isRead: true,
      },
    });
  }
}
