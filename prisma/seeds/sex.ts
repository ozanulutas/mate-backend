import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function sex() {
  await prisma.sex.deleteMany();
  await prisma.sex.create({ data: { name: 'Male', id: 1 } });
  await prisma.sex.create({ data: { name: 'Female', id: 2 } });
}
