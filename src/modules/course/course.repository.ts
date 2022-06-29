import { Injectable } from '@nestjs/common';
import { CONSTANTS } from '../../constants/constants';
import { TABLE } from '../../constants/tableName';
import { InsertQueryBuilder, SearchQueryBuilder, UpdateQueryBuilder } from 'src/db/queryBuilder';
import { DatabaseService } from '../../db/db.service';
import { IPaginatedResponse } from '../lesson/lesson.interface';
import { Course } from './course.entity';
import { ICourseFilter, IUpdateCourse } from './course.interface';

@Injectable()
export class CourseRepository {
  private pool;

  constructor( private readonly dbInstance: DatabaseService) {
    this.pool = dbInstance.pool;
  }

  public async createCourse(course: Course): Promise<string> {
    const { name, lessons, owner_user_id } = course;
    const insertQuery = new InsertQueryBuilder()
                          .intoTable(TABLE.COURSES)
                          .fieldsToInsert('name', 'lesson_ids', 'owner_user_id')
                          .build();
    const result = await this.pool.query(insertQuery, [name, lessons, owner_user_id])
    return result.rows[0].id;
  }

  public async getCourseById(id: number): Promise<Course> {
    const existingLanguageQuery = new SearchQueryBuilder()
                          .select('id')
                          .fromTable(TABLE.COURSES)
                          .where('id', 'is_deleted')
                          .build();
    const result = await this.pool.query(existingLanguageQuery, [id, false]);
    return result.rows[0];
  }

  public async getAllCourses(courseFilter: ICourseFilter): Promise<IPaginatedResponse<Course>> {
    courseFilter.is_deleted = false;
    const limit = parseInt(courseFilter.limit) || CONSTANTS.DEFAULT_LIMIT;
    const offset =  limit * (parseInt(courseFilter.page) - 1) || CONSTANTS.DEFAULT_OFFSET;
    delete courseFilter.limit;
    delete courseFilter.page;

    const courseFilterKeys = Object.keys(courseFilter).map(key => key = `courses.${key}`);

    const searchQueryBuilder = new SearchQueryBuilder()
                                .select(
                                  'courses.id', 
                                  'courses.name',
                                  'courses.lesson_ids',
                                  'courses.owner_user_id',
                                  'users.first_name AS user_first_name', 
                                  'users.last_name AS user_last_name'
                                )
                                .fromTable(TABLE.COURSES)
                                .join(TABLE.USERS, 'id', 'LEFT')
                                .where(...courseFilterKeys)
                                .orderBy('courses.created_at')
                                .limit(limit)
                                .skip(offset)
                                .build(); 
    const data = await this.pool.query(searchQueryBuilder, [...Object.values(courseFilter)]);
    
    const totalCountQuery = new SearchQueryBuilder()
                              .select('COUNT(*)')
                              .fromTable(TABLE.COURSES)
                              .join(TABLE.USERS, 'id', 'LEFT')
                              .where(...courseFilterKeys)
                              .build(); 
    
    const totalCountResult = await this.pool.query(totalCountQuery, [...Object.values(courseFilter)]);
    
    const result: IPaginatedResponse<Course> = {
      data: data.rows,
      record_per_page: data.rowCount,
      total_count: totalCountResult.rows[0].count
    }
    return result;                        
  }

  public async deleteCourseById(courseId: number): Promise<any> {
    const updateQuery = new UpdateQueryBuilder()
                          .intoTable(TABLE.COURSES)
                          .fieldsToUpdate('is_deleted')
                          .where('id')
                          .build();
    return await this.pool.query(updateQuery, [true, courseId]); 
  }

  public async updateCourseById(courseId: number, courseUpdateObject: IUpdateCourse): Promise<Course> {
    const updateQuery = new UpdateQueryBuilder()
                          .intoTable(TABLE.COURSES)
                          .fieldsToUpdate(...Object.keys(courseUpdateObject))
                          .where('id')
                          .build();
    const result = await this.pool.query(updateQuery, [...Object.values(courseUpdateObject), courseId]);
    return result.rows[0];
  }
}