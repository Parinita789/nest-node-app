import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UserRequestDto {
  @Type(() => String)
  @IsNotEmpty()
  first_name: string;

  @Type(() => String)
  @IsNotEmpty()
  last_name: string;

  @Type(() => String)
  @IsNotEmpty()
  user_name: string;

  @Type(() => String)
  @IsNotEmpty()
  password: string;
}