import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { FriendshipRemoveAction } from 'src/user/user.constants';

export class FriendshipRemovedDto {
  @IsNotEmpty()
  @IsEnum(FriendshipRemoveAction)
  removeAction: FriendshipRemoveAction;

  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverId: number;
}
