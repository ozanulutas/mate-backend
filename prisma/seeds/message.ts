import { PrismaClient } from '@prisma/client';

export async function message(prisma: PrismaClient) {
  await prisma.message.deleteMany();
  await prisma.message.createMany({
    data: [
      {
        id: 1,
        senderId: 2,
        text: 'slm',
        createdAt: new Date('2023-02-04 12:03:24.651'),
      },
      {
        id: 2,
        senderId: 2,
        text: 'nbr',
        createdAt: new Date('2023-02-04 12:03:25.651'),
      },
      {
        id: 3,
        senderId: 1,
        text: 'iyidir',
        createdAt: new Date('2023-02-04 12:03:26.651'),
      },
      {
        id: 4,
        senderId: 1,
        text: 'senden',
        createdAt: new Date('2023-02-04 12:03:27.651'),
      },

      {
        id: 5,
        senderId: 3,
        text: 'nerelerdesin',
        createdAt: new Date('2023-02-04 12:03:24.651'),
      },
      {
        id: 6,
        senderId: 3,
        text: 'sesin soluğun çıkmıyor',
        createdAt: new Date('2023-02-04 12:03:25.651'),
      },
      {
        id: 7,
        senderId: 3,
        text: 'iyi misin',
        createdAt: new Date('2023-02-04 12:03:26.651'),
      },
      {
        id: 8,
        senderId: 1,
        text: 'iyidir beya',
        createdAt: new Date('2023-02-04 12:03:27.651'),
      },
      {
        id: 9,
        senderId: 1,
        text: 'nolsun',
        createdAt: new Date('2023-02-04 12:03:28.651'),
      },
      {
        id: 10,
        senderId: 1,
        text: 'seni sormalı',
        createdAt: new Date('2023-02-04 12:03:29.651'),
      },
      {
        id: 11,
        senderId: 3,
        text: 'napalım iş güç',
        createdAt: new Date('2023-02-04 12:03:30.651'),
      },
      {
        id: 12,
        senderId: 1,
        text: 'iyi iyi',
        createdAt: new Date('2023-02-04 12:03:31.651'),
      },

      {
        id: 13,
        senderId: 1,
        text: 'yeah',
        createdAt: new Date('2023-02-04 12:03:24.651'),
      },
      {
        id: 14,
        senderId: 5,
        text: 'hop',
        createdAt: new Date('2023-02-04 12:03:24.651'),
      },
    ],
  });
  await prisma.$queryRaw`SELECT setval(pg_get_serial_sequence('message', 'id'), coalesce(max(id)+1, 1), false) FROM message;`;
  // await prisma.$queryRaw`SELECT setval('message_id_seq', (SELECT max(id) FROM message))`;
}
