import { IsOptional } from 'class-validator';

export class GetChatDto {
  @IsOptional()
  peerId: number;
}
