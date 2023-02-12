import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FollowDto {
  @IsNumber()
  @IsNotEmpty()
  followerId: number;

  @IsOptional({ groups: ['controller'] })
  @IsNumber()
  @IsNotEmpty({ groups: ['provider'] })
  followingId: number;
}
