import { GetLessonResponse } from './getLessonResponse.dto';

export class GetLessonsResponse {
  lessons: GetLessonResponse[];
  record_per_page: number;
  total_count: number;

  constructor(lessons: GetLessonResponse[], record_per_page: number, total_count: number,) {
    this.lessons = lessons;
    this.record_per_page = record_per_page;
    this.total_count = total_count;
  }
}