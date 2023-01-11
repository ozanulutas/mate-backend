import { PrismaClient } from '@prisma/client';

export async function userCategory(prisma: PrismaClient) {
  await prisma.userCategory.deleteMany();
  await prisma.userCategory.createMany({
    data: [
      { id: 1, userId: 1, categoryId: 10 },
      { id: 2, userId: 1, categoryId: 4 },
      { id: 3, userId: 1, categoryId: 5 },
      { id: 4, userId: 1, categoryId: 6 },

      { id: 5, userId: 2, categoryId: 1 },
      { id: 6, userId: 2, categoryId: 10 },
      { id: 7, userId: 2, categoryId: 10 },
      { id: 8, userId: 2, categoryId: 15 },
      { id: 9, userId: 2, categoryId: 16 },
    ],
  });
}
