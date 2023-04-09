import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FriendshipStatus } from '../user.constants';
import { Transform } from 'class-transformer';

export class GetFriendshipsQuery {
  @Transform(({ value }) => +value)
  @IsEnum(FriendshipStatus)
  @IsOptional()
  status: FriendshipStatus;

  @IsString()
  @IsOptional()
  name: string;
}
