import { OmitType } from '@nestjs/mapped-types';
import { UpdateLocationDto as BaseUpdateLocationDto } from 'src/location/dto';

export class UpdateLocationDto extends OmitType(BaseUpdateLocationDto, [
  'id',
]) {}
