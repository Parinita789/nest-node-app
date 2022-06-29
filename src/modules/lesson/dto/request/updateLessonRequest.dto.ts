import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateLessonRequestDto {
  @Type(() => String)
  @IsOptional()
  name: string;

  @Type(() => String)
  @IsOptional()
  lesson_text: string;
}