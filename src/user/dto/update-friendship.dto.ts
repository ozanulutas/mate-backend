import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { FriendshipStatus } from '../user.constants';

export class UpdateFriendshipDto {
  @IsNumber()
  @IsOptional()
  senderId: number;

  @IsNumber()
  @IsNotEmpty()
  receiverId: number;

  @IsEnum(FriendshipStatus)
  @IsNotEmpty()
  friendshipStatusId: FriendshipStatus;
}
