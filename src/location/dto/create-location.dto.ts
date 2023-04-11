import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  coordinates: any; // @TODO: type

  @IsBoolean()
  @IsOptional()
  isSelected: boolean;
}
