import { PrismaClient } from '@prisma/client';

export async function selectedLocation(prisma: PrismaClient) {
  await prisma.selectedLocation.deleteMany();
  await prisma.selectedLocation.createMany({
    data: [
      { id: 1, userId: 1, locationId: 1 },
      { id: 2, userId: 2, locationId: 4 },
      { id: 3, userId: 3, locationId: 7 },
    ],
  });
}
