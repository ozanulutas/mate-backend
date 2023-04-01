import { IsEnum, IsOptional } from 'class-validator';
import { NotificationType } from 'src/notification/notification.constants';

export class NewNotificationDto {
  @IsOptional()
  @IsEnum(NotificationType)
  type: NotificationType;
}
