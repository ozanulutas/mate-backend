import { PrismaClient } from '@prisma/client';

export async function message(prisma: PrismaClient) {
  await prisma.message.deleteMany();
  await prisma.message.createMany({
    data: [
      { id: 1, senderId: 2, text: 'slm', createdAt: '2023-02-04 12:03:24.651' },
      { id: 2, senderId: 2, text: 'nbr', createdAt: '2023-02-04 12:03:25.651' },
      {
        id: 3,
        senderId: 1,
        text: 'iyidir',
        createdAt: '2023-02-04 12:03:26.651',
      },
      {
        id: 4,
        senderId: 1,
        text: 'senden',
        createdAt: '2023-02-04 12:03:27.651',
      },

      {
        id: 5,
        senderId: 3,
        text: 'nerelerdesin',
        createdAt: '2023-02-04 12:03:24.651',
      },
      {
        id: 6,
        senderId: 3,
        text: 'sesin soluğun çıkmıyor',
        createdAt: '2023-02-04 12:03:25.651',
      },
      {
        id: 7,
        senderId: 3,
        text: 'iyi misin',
        createdAt: '2023-02-04 12:03:26.651',
      },
      {
        id: 8,
        senderId: 1,
        text: 'iyidir beya',
        createdAt: '2023-02-04 12:03:27.651',
      },
      {
        id: 9,
        senderId: 1,
        text: 'nolsun',
        createdAt: '2023-02-04 12:03:28.651',
      },
      {
        id: 10,
        senderId: 1,
        text: 'seni sormalı',
        createdAt: '2023-02-04 12:03:29.651',
      },
      {
        id: 11,
        senderId: 3,
        text: 'napalım iş güç',
        createdAt: '2023-02-04 12:03:30.651',
      },
      {
        id: 12,
        senderId: 1,
        text: 'iyi iyi',
        createdAt: '2023-02-04 12:03:31.651',
      },

      {
        id: 13,
        senderId: 1,
        text: 'yeah',
        createdAt: '2023-02-04 12:03:24.651',
      },
      {
        id: 14,
        senderId: 5,
        text: 'hop',
        createdAt: '2023-02-04 12:03:24.651',
      },
    ],
  });
}
