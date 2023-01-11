import { PrismaClient } from '@prisma/client';

export async function follow(prisma: PrismaClient) {
  await prisma.follow.deleteMany();
  await prisma.follow.createMany({
    data: [
      { id: 1, followerId: 1, followingId: 2 },
      { id: 2, followerId: 1, followingId: 3 },
      { id: 3, followerId: 3, followingId: 2 },
    ],
  });
}
