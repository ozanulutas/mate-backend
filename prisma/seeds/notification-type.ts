import { PrismaClient } from '@prisma/client';
import { NotificationType } from '../../src/notification/notification.constants';

export async function notificationType(prisma: PrismaClient) {
  await prisma.notificationType.deleteMany();
  await prisma.notificationType.createMany({
    data: [
      {
        id: NotificationType.FRIENDSHIP_REQUESTED,
        name: 'friendship_requested',
      },
      { id: NotificationType.FRIENDSHIP_ACCEPTED, name: 'friendship_accepted' },
      { id: NotificationType.FOLLOWED, name: 'followed' },
      { id: NotificationType.COMMENTED, name: 'commented' },
    ],
  });
}
