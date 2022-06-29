import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class SearchLessonRequestDto {
  @Type(() => String)
  @IsOptional()
  name: string;

  @Type(() => String)
  @IsOptional()
  language: string;

  @Type(() => String)
  @IsOptional()
  limit: string;

  @Type(() => String)
  @IsOptional()
  page: string;
}