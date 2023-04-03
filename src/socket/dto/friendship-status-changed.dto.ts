import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { FriendshipStatus } from 'src/user/user.constants';

export class FriendshipStatusChangedDto {
  @IsNotEmpty()
  @IsEnum(FriendshipStatus)
  friendshipStatusId: FriendshipStatus;

  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverId: number;
}
