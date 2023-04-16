import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class User {
  @IsNumber()
  id: number;

  @IsString()
  username: string;
}

export class NewMessageDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @ValidateNested()
  sender: User;

  @ValidateNested()
  receiver: User;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
