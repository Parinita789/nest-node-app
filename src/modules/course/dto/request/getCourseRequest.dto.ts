import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetCourseRequestDto {
  @Type(() => String)
  @IsOptional()
  name: string;

  @Type(() => Number)
  @IsOptional()
  owner_user_id: number;
}