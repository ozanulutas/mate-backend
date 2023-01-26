import { IsNotEmpty, IsString } from 'class-validator';

export class GetCategoriesByNameDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
