import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLanguageRequestDto {
  @Type(() => String)
  @IsNotEmpty()
  name: string;

  @Type(() => String)
  @IsNotEmpty()
  code: string;
}