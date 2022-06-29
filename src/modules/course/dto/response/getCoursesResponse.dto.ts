import { GetCourseResponse } from './getCourseResponse.dto';

export class GetCoursesResponse {
  courses: GetCourseResponse[];
  record_per_page: number;
  total_count: number;

  constructor(courses: GetCourseResponse[], record_per_page: number, total_count: number,) {
    this.courses = courses;
    this.record_per_page = record_per_page;
    this.total_count = total_count;
  }
}