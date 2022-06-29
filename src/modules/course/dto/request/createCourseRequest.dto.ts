import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CourseCreateRequestDto {
  @Type(() => String)
  @IsNotEmpty()
  name: string;

  @Type(() => Array)
  @IsOptional()
  lesson_ids: number[];

  @Type(() => Number)
  @IsNotEmpty()
  owner_user_id: number;
}