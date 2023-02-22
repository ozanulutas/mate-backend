import { Module } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';

@Module({
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService],
})
export class NotificationModule {}
