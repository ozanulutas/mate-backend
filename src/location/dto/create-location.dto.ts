import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  latLon: string;

  // @IsString()
  // city: string;

  // @IsString()
  // country: string;
}
