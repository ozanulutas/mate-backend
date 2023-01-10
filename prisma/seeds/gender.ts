import { PrismaClient } from '@prisma/client';

export async function gender(prisma: PrismaClient) {
  await prisma.gender.deleteMany();
  await prisma.gender.create({ data: { name: 'Male', id: 1 } });
  await prisma.gender.create({ data: { name: 'Female', id: 2 } });
}
