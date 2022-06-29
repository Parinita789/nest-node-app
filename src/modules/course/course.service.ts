import { Injectable } from '@nestjs/common';
import { IPaginatedResponse } from '../lesson/lesson.interface';
import { Course } from './course.entity';
import { ICourseFilter } from './course.interface';
import { IUpdateCourse } from './course.interface';
import { CourseRepository } from './course.repository';

@Injectable()
export class CourseService {
  constructor(
    public readonly courseRepository: CourseRepository
  ) {}

  async createCourse(course: Course): Promise<string> {
    return this.courseRepository.createCourse(course);
  }

  async getCourseById(id: number): Promise<Course> {
    return this.courseRepository.getCourseById(id)
  }

  public async getAllCourses(courseFilter: ICourseFilter): Promise<IPaginatedResponse<Course>> {
    return this.courseRepository.getAllCourses(courseFilter)
  }

  public async updateCourseById(courseId: number, courseUpdateObject: IUpdateCourse): Promise<Course> {
    return this.courseRepository.updateCourseById(courseId, courseUpdateObject)
  }

  public async deleteCourseById(courseId: number): Promise<any> {
    return this.courseRepository.deleteCourseById(courseId);
  }

}