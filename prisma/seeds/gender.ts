import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function gender() {
  await prisma.gender.deleteMany();
  await prisma.gender.create({ data: { name: 'Male', id: 1 } });
  await prisma.gender.create({ data: { name: 'Female', id: 2 } });
}
