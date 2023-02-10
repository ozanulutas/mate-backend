import { PrismaClient } from '@prisma/client';

export async function friend(prisma: PrismaClient) {
  await prisma.friend.deleteMany();
  await prisma.friend.createMany({
    data: [
      { id: 1, senderId: 1, receiverId: 2, friendshipStatusId: 2 },
      { id: 2, senderId: 3, receiverId: 1, friendshipStatusId: 2 },
      { id: 3, senderId: 2, receiverId: 3, friendshipStatusId: 2 },
    ],
  });
  await prisma.$queryRaw`SELECT setval(pg_get_serial_sequence('friend', 'id'), coalesce(max(id)+1, 1), false) FROM friend;`;
}
