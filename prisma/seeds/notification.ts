import { PrismaClient } from '@prisma/client';
import { NotificationType } from '../../src/notification/notification.constants';

export async function notification(prisma: PrismaClient) {
  await prisma.notification.deleteMany();
  await prisma.notification.createMany({
    data: [
      {
        id: 1,
        actorId: 3,
        entityId: 3,
        notificationTypeId: NotificationType.FRIENDSHIP_REQUESTED,
        createdAt: new Date('2023-02-12 15:04:13.690'),
      },
      {
        id: 2,
        actorId: 2,
        entityId: 1,
        notificationTypeId: NotificationType.COMMENTED,
        createdAt: new Date('2023-02-12 16:04:13.690'),
      },
      {
        id: 3,
        actorId: 2,
        entityId: 2,
        notificationTypeId: NotificationType.FRIENDSHIP_ACCEPTED,
        createdAt: new Date('2023-02-12 17:04:13.690'),
      },
      {
        id: 4,
        actorId: 3,
        entityId: 3,
        notificationTypeId: NotificationType.FRIENDSHIP_ACCEPTED,
        createdAt: new Date('2023-02-12 15:04:13.690'),
      },
    ],
  });
  await prisma.$queryRaw`SELECT setval(pg_get_serial_sequence('notification', 'id'), coalesce(max(id)+1, 1), false) FROM notification;`;
}
