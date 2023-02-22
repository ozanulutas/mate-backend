import { IsOptional } from 'class-validator';
import { NotificationType } from '../notification.constants';

export class RemoveUserNotificationDto {
  @IsOptional()
  actorId: number;

  @IsOptional()
  entityId: number;

  @IsOptional()
  notificationTypeId: NotificationType;
}
