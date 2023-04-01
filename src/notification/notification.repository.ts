import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateNotificationDto,
  GetNotificationCountDto,
  RemoveNotificationDto,
} from './dto';
import { NotificationType } from './notification.constants';

@Injectable()
export class NotificationRepository {
  constructor(private prisma: PrismaService) {}

  getUserNotifications(userId: number) {
    return this.prisma.notification.findMany({
      where: {
        notifiers: {
          some: {
            notifierId: userId,
          },
        },
        notificationTypeId: {
          not: NotificationType.FRIENDSHIP_REQUESTED,
        },
      },
      select: {
        id: true,
        entityId: true,
        notificationTypeId: true,
        createdAt: true,
        actor: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  createNotification({ notifierIds, ...rest }: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        ...rest,
        notifiers: {
          create: notifierIds.map((notifierId) => ({ notifierId })),
        },
      },
      select: {
        id: true,
        entityId: true,
        notificationTypeId: true,
        createdAt: true,
        actor: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  removeNotification(removeNotificationDto: RemoveNotificationDto) {
    return this.prisma.notification.deleteMany({
      where: removeNotificationDto,
    });
  }

  getNotificationCount(getNotificationCountDto: GetNotificationCountDto) {
    return this.prisma.notification.count({
      where: {
        notifiers: {
          every: getNotificationCountDto,
        },
        notificationTypeId: {
          not: NotificationType.FRIENDSHIP_REQUESTED,
        },
      },
    });
  }

  updateNotificationsAsViewed(notifierId: number) {
    return this.prisma.notifier.updateMany({
      where: {
        notifierId,
        isViewed: false,
        notification: {
          notificationTypeId: {
            not: NotificationType.FRIENDSHIP_REQUESTED,
          },
        },
      },
      data: {
        isViewed: true,
      },
    });
  }
}
