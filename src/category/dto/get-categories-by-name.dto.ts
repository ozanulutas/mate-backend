import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class GetCategoriesByNameDto {
  @IsString()
  @IsOptional()
  name: string;

  @Transform(({ value }) => Boolean(value))
  @IsBoolean()
  @IsOptional()
  filterSelected: boolean;
}
