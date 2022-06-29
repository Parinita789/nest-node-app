import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCourseRequestDto {
  @Type(() => String)
  @IsOptional()
  name: string;

  @Type(() => Array)
  @IsOptional()
  lesson_ids: string[];

  @Type(() => Number)
  @IsOptional()
  active_lesson: number;
}