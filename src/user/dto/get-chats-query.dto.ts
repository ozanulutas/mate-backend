import { IsOptional, IsString } from 'class-validator';

export class GetChatsQueryDto {
  @IsString({ each: true })
  @IsOptional()
  count: ['unread'?];
}
