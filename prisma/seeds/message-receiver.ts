import { PrismaClient } from '@prisma/client';

export async function messageReceiver(prisma: PrismaClient) {
  await prisma.messageReceiver.deleteMany();
  await prisma.messageReceiver.createMany({
    data: [
      { id: 1, messageId: 1, receiverId: 1, isRead: true },
      { id: 2, messageId: 2, receiverId: 1, isRead: true },
      { id: 3, messageId: 3, receiverId: 2, isRead: true },
      { id: 4, messageId: 4, receiverId: 2, isRead: false },

      { id: 5, messageId: 5, receiverId: 1, isRead: true },
      { id: 6, messageId: 6, receiverId: 1, isRead: true },
      { id: 7, messageId: 7, receiverId: 1, isRead: true },
      { id: 8, messageId: 8, receiverId: 3, isRead: true },
      { id: 9, messageId: 9, receiverId: 3, isRead: true },
      { id: 10, messageId: 10, receiverId: 3, isRead: true },
      { id: 11, messageId: 11, receiverId: 1, isRead: true },
      { id: 12, messageId: 12, receiverId: 3, isRead: false },

      { id: 13, messageId: 13, receiverId: 4, isRead: false },
      { id: 14, messageId: 14, receiverId: 1, isRead: false },
    ],
  });
}
