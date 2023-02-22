import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNotificationDto, RemoveUserNotificationDto } from './dto';

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
        createdAt: 'asc',
      },
    });
  }

  createNotification({ notifierIds, ...rest }: CreateNotificationDto) {
    console.log({ notifierIds, rest });

    return this.prisma.notification.create({
      data: {
        ...rest,
        notifiers: {
          create: notifierIds.map((notifierId) => ({ notifierId })),
        },
      },
    });
  }

  removeUserNotification(removeUserNotificationDto: RemoveUserNotificationDto) {
    return this.prisma.notification.deleteMany({
      where: removeUserNotificationDto,
    });
  }
}
