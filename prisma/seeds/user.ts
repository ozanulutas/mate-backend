import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export async function user(prisma: PrismaClient) {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: {
      id: 1,
      username: 'ozan',
      email: 'ozan@mail.com',
      password: await bcrypt.hash('123', 10),
    },
  });
  await prisma.user.create({
    data: {
      id: 2,
      username: 'onur',
      email: 'onur@mail.com',
      password: await bcrypt.hash('123', 10),
    },
  });
}
