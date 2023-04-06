import { IsEnum, IsOptional } from 'class-validator';
import { FriendshipRemoveAction } from '../user.constants';
import { RequestFriendshipDto } from './request-friendship.dto';

export class DeleteFriendshipDto extends RequestFriendshipDto {
  @IsOptional()
  @IsEnum(FriendshipRemoveAction)
  removeAction: FriendshipRemoveAction;
}
