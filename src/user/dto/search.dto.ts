import { IsNotEmpty, IsNumber } from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @IsNumber()
  lon: number;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  categories: number[];

  @IsNotEmpty()
  @IsNumber()
  distance: number;
}
