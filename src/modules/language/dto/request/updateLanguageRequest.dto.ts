import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class LanguageUpdateRequestDto {
  @Type(() => String)
  @IsOptional()
  name: string;

  @Type(() => String)
  @IsOptional()
  code: string;
}