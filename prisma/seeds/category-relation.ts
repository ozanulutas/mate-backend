import { PrismaClient } from '@prisma/client';

export async function categoryRelation(prisma: PrismaClient) {
  await prisma.categoryRelation.deleteMany();
  await prisma.categoryRelation.createMany({
    data: [
      { id: 1, categoryId: 1, childCategoryId: 2 },
      { id: 2, categoryId: 2, childCategoryId: 3 },
      { id: 3, categoryId: 2, childCategoryId: 7 },
      { id: 4, categoryId: 3, childCategoryId: 4 },
      { id: 5, categoryId: 4, childCategoryId: 5 },
      { id: 6, categoryId: 4, childCategoryId: 6 },
      { id: 7, categoryId: 7, childCategoryId: 8 },
      { id: 8, categoryId: 8, childCategoryId: 9 },
      { id: 9, categoryId: 8, childCategoryId: 10 },

      { id: 10, categoryId: 11, childCategoryId: 12 },
      { id: 11, categoryId: 12, childCategoryId: 13 },
      { id: 12, categoryId: 13, childCategoryId: 14 },
      { id: 13, categoryId: 14, childCategoryId: 16 },
      { id: 14, categoryId: 15, childCategoryId: 16 },
    ],
  });
}
