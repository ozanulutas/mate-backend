import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UserDto } from 'src/user/dto';

export class NewMessageDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @ValidateNested()
  sender: UserDto;

  @ValidateNested()
  receiver: UserDto;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
