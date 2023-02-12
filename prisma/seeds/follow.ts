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
  await prisma.$queryRaw`SELECT setval(pg_get_serial_sequence('follow', 'id'), coalesce(max(id)+1, 1), false) FROM follow;`;
}
