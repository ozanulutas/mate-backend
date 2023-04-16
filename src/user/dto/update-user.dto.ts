import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  oldPassword?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
