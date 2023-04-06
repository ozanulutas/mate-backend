import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AcceptFriendshipDto {
  @IsNumber()
  @IsNotEmpty()
  senderId: number;

  @IsNumber()
  @IsOptional()
  receiverId: number;
}
