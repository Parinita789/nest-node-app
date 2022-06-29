import { Injectable } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { ILessonFilter, ILessonUpdate, IPaginatedResponse } from './lesson.interface';
import { LessonRepository } from './lesson.repository';

@Injectable()
export class LessonService {
  constructor(
    public readonly lessonRepository: LessonRepository
  ) {}

  public async createLesson(lesson: Lesson): Promise<number> {
    return this.lessonRepository.createLesson(lesson);
  }

  public async findOneLesson(findObject: object): Promise<Lesson> {
    return this.lessonRepository.findOneLesson(findObject);
  }

  public async getAllLessons(lessonFilter?: ILessonFilter): Promise<IPaginatedResponse<Lesson>> {
    return this.lessonRepository.getAllLessons(lessonFilter)
  }

  public async updateLessonById(lessonId: number, lessonUpdateObject: ILessonUpdate): Promise<Lesson> {
    return this.lessonRepository.updateLessonFieldsById(lessonId, lessonUpdateObject)
  }

  public async deleteLessonById(lessonId: number): Promise<any> {
    return this.lessonRepository.deleteLessonById(lessonId);
  }

}