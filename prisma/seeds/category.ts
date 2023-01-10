import { PrismaClient } from '@prisma/client';

export async function category(prisma: PrismaClient) {
  await prisma.category.deleteMany();
  await prisma.category.createMany({
    data: [
      { id: 1, name: 'Sports' },
      { id: 2, name: 'Physical Sports' },
      { id: 3, name: 'Climbing' },
      { id: 4, name: 'Rock Climbing' },
      { id: 5, name: 'Sport Climbing' },
      { id: 6, name: 'Bouldering' },
      { id: 7, name: 'Cycling' },
      { id: 8, name: 'Bicycle' },
      { id: 9, name: 'BMX' },
      { id: 10, name: 'XC' },

      { id: 11, name: 'Art' },
      { id: 12, name: 'Performing arts' },
      { id: 13, name: 'Music' },
      { id: 14, name: 'Popular Music' },
      { id: 15, name: 'Rock Music' },
      { id: 16, name: 'Metal Music' },
    ],
  });
}
