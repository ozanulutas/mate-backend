import { IsNotEmpty, IsNumber } from 'class-validator';

export class RequestFriendshipDto {
  @IsNumber()
  @IsNotEmpty()
  senderId: number;

  @IsNumber()
  @IsNotEmpty()
  receiverId: number;
}
