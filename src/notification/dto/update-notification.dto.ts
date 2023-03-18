import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @IsNumber()
  @IsNotEmpty()
  notifierId: number;

  @IsBoolean()
  @IsOptional()
  isViewed: boolean;
}
