import { IsString } from 'class-validator';

export class GetCategoriesByNameDto {
  @IsString()
  name: string;
}
