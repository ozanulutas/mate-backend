import { PrismaClient } from '@prisma/client';

export async function comment(prisma: PrismaClient) {
  await prisma.comment.deleteMany();
  await prisma.comment.createMany({
    data: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet.',
        userId: 1,
        postId: 1,
      },
      {
        id: 2,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        userId: 2,
        postId: 2,
      },
      {
        id: 3,
        text: 'Lorem ipsum.',
        userId: 3,
        postId: 2,
      },
    ],
  });
}
