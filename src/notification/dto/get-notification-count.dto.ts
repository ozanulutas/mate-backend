import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetNotificationCountDto {
  @IsNumber()
  @IsNotEmpty()
  notifierId: number;

  @IsBoolean()
  @IsOptional()
  isViewed: boolean;
}
