import { PrismaClient } from '@prisma/client';

export async function gender(prisma: PrismaClient) {
  await prisma.gender.deleteMany();
  await prisma.gender.createMany({
    data: [
      { id: 1, name: 'male' },
      { id: 2, name: 'female' },
    ],
  });
}
