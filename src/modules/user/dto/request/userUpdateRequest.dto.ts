import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UserUpdateRequestDto {
  @Type(() => String)
  @IsOptional()
  first_name: string;

  @Type(() => String)
  @IsOptional()
  last_name: string;

  @Type(() => String)
  @IsOptional()
  password: string;
}