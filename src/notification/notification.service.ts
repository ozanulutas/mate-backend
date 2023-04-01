import { Injectable } from '@nestjs/common';
import { SoketClientProvider } from 'src/socket/socket-client.provider';
import { SocketEvent } from 'src/socket/socket.constants';
import {
  CreateNotificationDto,
  GetNotificationCountDto,
  RemoveNotificationDto,
} from './dto';
import { NotificationRepository } from './notification.repository';
import { NotificationType } from './notification.constants';

@Injectable()
export class NotificationService {
  constructor(
    private notificationRepository: NotificationRepository,
    private socketProivder: SoketClientProvider,
  ) {}

  getUserNotifications(userId: number) {
    return this.notificationRepository.getUserNotifications(userId);
  }

  async createNotification(createNotificationDto: CreateNotificationDto) {
    const { notifierIds, notificationTypeId } = createNotificationDto;

    const result = await this.notificationRepository.createNotification(
      createNotificationDto,
    );

    if (notificationTypeId !== NotificationType.FRIENDSHIP_REQUESTED) {
      this.socketProivder.socket.emit(
        SocketEvent.NEW_NOTIFICATION,
        notifierIds[0],
      );
    }

    return result;
  }

  removeNotification(removeNotificationDto: RemoveNotificationDto) {
    return this.notificationRepository.removeNotification(
      removeNotificationDto,
    );
  }

  getNotificationCount(getNotificationCountDto: GetNotificationCountDto) {
    return this.notificationRepository.getNotificationCount(
      getNotificationCountDto,
    );
  }

  updateNotificationsAsViewed(notifierId: number) {
    return this.notificationRepository.updateNotificationsAsViewed(notifierId);
  }
}
