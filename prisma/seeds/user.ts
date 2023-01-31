import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

export async function user(prisma: PrismaClient) {
  await prisma.user.deleteMany();
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        username: 'ozan',
        email: 'ozan@mail.com',
        password: await bcrypt.hash('123', 10),
        birthday: new Date('1991-05-18 00:00:00.000'),
        info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, rem veniam nesciunt cum expedita veritatis pariatur error commodi temporibus praesentium quo vero doloremque accusantium delectus enim, voluptatem porro quibusdam? Ut.',
      },
      {
        id: 2,
        username: 'onur',
        email: 'onur@mail.com',
        password: await bcrypt.hash('123', 10),
        birthday: new Date('1996-03-31 00:00:00.000').toISOString(),
        info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, rem veniam nesciunt cum expedita veritatis pariatur error commodi temporibus praesentium quo vero doloremque accusantium delectus enim, voluptatem porro quibusdam? Ut.',
      },
      {
        id: 3,
        username: 'ramoş',
        email: 'ramos@mail.com',
        password: await bcrypt.hash('123', 10),
        birthday: new Date('1964-05-06 00:00:00.000').toISOString(),
        info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia, rem veniam nesciunt cum expedita veritatis pariatur error commodi temporibus praesentium quo vero doloremque accusantium delectus enim, voluptatem porro quibusdam? Ut.',
      },
    ],
  });
}
