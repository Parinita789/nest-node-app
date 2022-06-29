import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../db/db.service';
import { Lesson } from './lesson.entity';
import { 
  ILessonFilter, 
  ILessonUpdate, 
  IPaginatedResponse 
} from './lesson.interface';
import { 
  SearchQueryBuilder, 
  InsertQueryBuilder, 
  UpdateQueryBuilder 
} from '../../db/queryBuilder';
import { TABLE } from '../../constants/tableName';
import { CONSTANTS } from '../../constants/constants';

@Injectable()
export class LessonRepository {
  private pool;

  constructor( 
    private readonly db: DatabaseService
  ) {
    this.pool = db.pool;
  }
  
  public async createLesson(lesson: Lesson): Promise<number> {
    const { name, language_id, lesson_text } = lesson;
    const insertQuery = new InsertQueryBuilder()
                          .intoTable(TABLE.LESSONS)
                          .fieldsToInsert('name', 'language_id', 'lesson_text')
                          .build();

    const result = await this.pool.query(insertQuery, [name, language_id, lesson_text]);
    return result.rows[0].id;
  }

  public async findOneLesson(findObject: object): Promise<Lesson> {
    const existingLessonQuery = new SearchQueryBuilder()
                          .select(...Object.keys(findObject))
                          .fromTable(TABLE.LESSONS)
                          .where(...Object.keys(findObject))
                          .build();
    const result = await this.pool.query(existingLessonQuery, [...Object.values(findObject)]);
    return result.rows[0];
  }

  public async getAllLessons(lessonFilter: ILessonFilter): Promise<IPaginatedResponse<Lesson>> {
    lessonFilter.is_deleted = false;
    const limit = parseInt(lessonFilter.limit) || CONSTANTS.DEFAULT_LIMIT;
    const offset =  limit * (parseInt(lessonFilter.page) - 1) || CONSTANTS.DEFAULT_OFFSET;
    delete lessonFilter.limit;
    delete lessonFilter.page;
    const lessonFilterKeys = Object.keys(lessonFilter).map(key => key = `lessons.${key}`);

    const searchQueryBuilder = new SearchQueryBuilder()
                                .select(
                                  'lessons.id', 
                                  'lessons.name', 
                                  'lessons.lesson_text', 
                                  'lessons.created_at',
                                  'lessons.language_id',
                                  'languages.code AS language_code', 
                                  'languages.name AS language_name'
                                )
                                .fromTable(TABLE.LESSONS)
                                .join(TABLE.LANGUAGES, 'id', 'LEFT')
                                .where(...lessonFilterKeys)
                                .orderBy('lessons.created_at')
                                .limit(limit)
                                .skip(offset)
                                .build();
    const data = await this.pool.query(searchQueryBuilder, [...Object.values(lessonFilter)]);
    
    const totalCountQuery = new SearchQueryBuilder()
                              .select('COUNT(*)')
                              .fromTable(TABLE.LESSONS)
                              .join(TABLE.LANGUAGES, 'id', 'LEFT')
                              .where(...lessonFilterKeys)
                              .build(); 

    const totalCountResult = await this.pool.query(totalCountQuery, [...Object.values(lessonFilter)]); 

    const result: IPaginatedResponse<Lesson> = {
      data: data.rows,
      record_per_page: data.rows.length,
      total_count: totalCountResult.rows[0].count
    }
    return result;
  }

  public async deleteLessonById(lessonId: number): Promise<any> {
    const updateQuery = new UpdateQueryBuilder()
                          .intoTable(TABLE.LESSONS)
                          .fieldsToUpdate('is_deleted')
                          .where('id')
                          .build();
    return await this.pool.query(updateQuery, [true, lessonId]);                   
  }

  public async updateLessonFieldsById(lessonId: number, lessonUpdateObject: ILessonUpdate): Promise<Lesson> {
    const updateQuery = new UpdateQueryBuilder()
                          .intoTable(TABLE.LESSONS)
                          .fieldsToUpdate(...Object.keys(lessonUpdateObject))
                          .where('id')
                          .build();
    const result = await this.pool.query(updateQuery, [...Object.values(lessonUpdateObject), lessonId]);
    return result.rows[0];
  }
}