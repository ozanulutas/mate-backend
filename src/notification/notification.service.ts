import { Injectable } from '@nestjs/common';
import { SoketClientProvider } from 'src/socket/socket-client.provider';
import { SocketEvent } from 'src/socket/socket.constants';
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
    private socketProivder: SoketClientProvider,
  ) {}

  getUserNotifications(userId: number) {
    return this.notificationRepository.getUserNotifications(userId);
  }

  async createNotification(createNotificationDto: CreateNotificationDto) {
    const { notifierIds } = createNotificationDto;

    const result = await this.notificationRepository.createNotification(
      createNotificationDto,
    );

    this.socketProivder.socket.emit(
      SocketEvent.NEW_NOTIFICATION,
      notifierIds[0],
    );

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

  updateNotificationIsViewed(notifierId: number, isViewed: boolean) {
    return this.notificationRepository.updateNotificationIsViewed(
      notifierId,
      isViewed,
    );
  }
}
