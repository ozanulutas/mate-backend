import { PrismaClient } from '@prisma/client';

export async function post(prisma: PrismaClient) {
  await prisma.post.deleteMany();
  await prisma.post.createMany({
    data: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, reiciendis?',
        userId: 1,
      },
      {
        id: 2,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, reiciendis?',
        userId: 2,
      },
      {
        id: 3,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, reiciendis?',
        userId: 3,
      },
      {
        id: 4,
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, reiciendis?',
        userId: 3,
      },
    ],
  });
}
