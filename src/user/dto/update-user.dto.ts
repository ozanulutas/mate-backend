import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  oldPassword?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  gsm?: string;

  @IsOptional()
  countryCode?: string;

  @IsOptional()
  birthday?: Date;

  @IsOptional()
  genderId?: number;
}
