import { PrismaClient } from '@prisma/client';

export async function categoryRelation(prisma: PrismaClient) {
  await prisma.categoryRelation.deleteMany();
  await prisma.categoryRelation.createMany({
    data: [
      { id: 1, parentId: 1, childId: 2 },
      { id: 2, parentId: 2, childId: 3 },
      { id: 3, parentId: 2, childId: 7 },
      { id: 4, parentId: 3, childId: 4 },
      { id: 5, parentId: 4, childId: 5 },
      { id: 6, parentId: 4, childId: 6 },
      { id: 7, parentId: 7, childId: 8 },
      { id: 8, parentId: 8, childId: 9 },
      { id: 9, parentId: 8, childId: 10 },

      { id: 10, parentId: 11, childId: 12 },
      { id: 11, parentId: 12, childId: 13 },
      { id: 12, parentId: 13, childId: 14 },
      { id: 13, parentId: 14, childId: 16 },
      { id: 14, parentId: 15, childId: 16 },
    ],
  });
}
