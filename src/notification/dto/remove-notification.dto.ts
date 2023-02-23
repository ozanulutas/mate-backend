import { IsOptional } from 'class-validator';
import { NotificationType } from '../notification.constants';

export class RemoveNotificationDto {
  @IsOptional()
  actorId: number;

  @IsOptional()
  entityId: number;

  @IsOptional()
  notificationTypeId: NotificationType;
}
