import { Injectable } from '@nestjs/common';
import { CreateNotificationDto, RemoveNotificationDto } from './dto';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  getUserNotifications(userId: number) {
    return this.notificationRepository.getUserNotifications(userId);
  }

  createNotification(createNotificationDto: CreateNotificationDto) {
    return this.notificationRepository.createNotification(
      createNotificationDto,
    );
  }

  removeNotification(removeNotificationDto: RemoveNotificationDto) {
    return this.notificationRepository.removeNotification(
      removeNotificationDto,
    );
  }
}
