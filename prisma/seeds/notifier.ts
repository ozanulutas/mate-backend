import { PrismaClient } from '@prisma/client';

export async function notifier(prisma: PrismaClient) {
  await prisma.notifier.deleteMany();
  await prisma.notifier.createMany({
    data: [
      {
        id: 1,
        notifierId: 1,
        notificationId: 1,
        isViewed: false,
      },
      {
        id: 2,
        notifierId: 1,
        notificationId: 2,
        isViewed: false,
      },
      {
        id: 3,
        notifierId: 1,
        notificationId: 3,
        isViewed: false,
      },
      {
        id: 4,
        notifierId: 2,
        notificationId: 4,
        isViewed: false,
      },
    ],
  });
  await prisma.$queryRaw`SELECT setval(pg_get_serial_sequence('notifier', 'id'), coalesce(max(id)+1, 1), false) FROM notifier;`;
}
