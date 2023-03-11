import { Module } from '@nestjs/common';
import { SocketModule } from 'src/socket/socket.module';
import { NotificationRepository } from './notification.repository';
import { NotificationService } from './notification.service';

@Module({
  imports: [SocketModule],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService],
})
export class NotificationModule {}
