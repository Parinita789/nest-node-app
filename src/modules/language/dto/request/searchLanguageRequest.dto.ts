import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchLanguageRequestDto {
  @Type(() => String)
  @IsOptional()
  name: string;

  @Type(() => String)
  @IsOptional()
  code: string;
}