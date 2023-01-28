import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  coordinates: any; // @TODO: type

  // @IsString()
  // city: string;

  // @IsString()
  // country: string;
}
