import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateLessonRequestDto {
  @Type(() => String)
  @IsNotEmpty()
  name: string;

  @Type(() => String)
  @IsNotEmpty()
  language_id: string;

  @Type(() => String)
  @IsOptional()
  lesson_text: string;
}