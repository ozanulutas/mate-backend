import { PrismaClient } from '@prisma/client';

export async function friendshipStatus(prisma: PrismaClient) {
  await prisma.friendshipStatus.deleteMany();
  await prisma.friendshipStatus.createMany({
    data: [
      { id: 1, status: 'is_requested' },
      { id: 2, status: 'is_accepted' },
      { id: 3, status: 'is_rejected' },
      { id: 4, status: 'is_cancelled' },
    ],
  });
}
