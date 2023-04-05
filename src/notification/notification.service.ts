import { Injectable } from '@nestjs/common';
import { SocketClientProvider } from 'src/socket/socket-client.provider';
import {
  CreateNotificationDto,
  GetNotificationCountDto,
  RemoveNotificationDto,
} from './dto';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private notificationRepository: NotificationRepository,
    private socketClient: SocketClientProvider,
  ) {}

  getUserNotifications(userId: number) {
    return this.notificationRepository.getUserNotifications(userId);
  }

  // @TODO: create a createAndSendNotification method to decouple the emit
  async createNotification(createNotificationDto: CreateNotificationDto) {
    const { notifierIds, notificationTypeId } = createNotificationDto;
    const result = await this.notificationRepository.createNotification(
      createNotificationDto,
    );

    this.socketClient.eventEmitter.newNotification(notifierIds[0], {
      type: notificationTypeId,
    });

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
