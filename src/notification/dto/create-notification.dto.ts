import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { NotificationType } from '../notification.constants';

export class CreateNotificationDto {
  @IsNotEmpty()
  actorId: number;

  @IsNotEmpty()
  entityId: number;

  @IsNotEmpty()
  @IsEnum(NotificationType)
  notificationTypeId: NotificationType;

  @IsNumber({}, { each: true })
  notifierIds: number[];
}
