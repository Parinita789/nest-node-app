import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../db/db.service';
import { Language } from './language.entity';
import { ILanguageFilter, ILanguageUpdate } from './language.interfaces';
import { 
  SearchQueryBuilder, 
  InsertQueryBuilder, 
  UpdateQueryBuilder 
} from '../../db/queryBuilder';
import { TABLE } from '../../constants/tableName';
import { IPaginatedResponse } from '../lesson/lesson.interface';
import { CONSTANTS } from '../../constants/constants';

@Injectable()
export class LanguageRepository {
  private pool;

  constructor( 
    private readonly db: DatabaseService
  ) {
    this.pool = db.pool;
  }

  public async crateLanguage(language: Language): Promise<number> {
    const { name, code } = language;
    const insertQuery = new InsertQueryBuilder()
                          .intoTable(TABLE.LANGUAGES)
                          .fieldsToInsert('name', 'code')
                          .build();
    const result = await this.pool.query(insertQuery, [name, code.toLocaleLowerCase()]);          
    return result.rows[0].id;
  }

  public async findOneLanguage(findObject: object): Promise<Language> {
    const existingLanguageQuery = new SearchQueryBuilder()
                          .select(...Object.keys(findObject))
                          .fromTable(TABLE.LANGUAGES)
                          .where(...Object.keys(findObject))
                          .build();
    const result = await this.pool.query(existingLanguageQuery, [...Object.values(findObject)]);
    return result.rows[0];
  }

  public async getAllLanguages(languageFilter: ILanguageFilter): Promise<IPaginatedResponse<Language>> {
    languageFilter.is_deleted = false;
    const limit = parseInt(languageFilter.limit) || CONSTANTS.DEFAULT_LIMIT;
    const offset =  limit * (parseInt(languageFilter.page) - 1) || CONSTANTS.DEFAULT_OFFSET;

    const searchQueryBuilder = new SearchQueryBuilder()
                                .select(
                                  'id',
                                  'name',
                                  'code',
                                  'created_at'
                                )
                                .fromTable(TABLE.LANGUAGES)
                                .where(...Object.keys(languageFilter))
                                .orderBy('created_at')
                                .build();

    const data = await this.pool.query(searchQueryBuilder, [...Object.values(languageFilter)]);

    const totalCountQuery = new SearchQueryBuilder()
                              .select('COUNT(*)')
                              .fromTable(TABLE.LANGUAGES)
                              .where(...Object.keys(languageFilter))
                              .build(); 

    const totalCountResult = await this.pool.query(totalCountQuery, [...Object.values(languageFilter)]);

    const result: IPaginatedResponse<Language> = {
      data: data.rows,
      record_per_page: data.rows.length,
      total_count: totalCountResult.rows[0].count
    }
    return result;                        
  }

  public async deleteLanguageById(languageId: number): Promise<any> {
    const updateQuery = new UpdateQueryBuilder()
                          .intoTable(TABLE.LANGUAGES)
                          .fieldsToUpdate('is_deleted')
                          .where('id')
                          .build();
    return await this.pool.query(updateQuery, [true, languageId]); 
  }

  public async deleteAllLanguages(): Promise<any> {
    const updateQuery = new UpdateQueryBuilder()
                          .intoTable(TABLE.LANGUAGES)
                          .fieldsToUpdate('is_deleted')
                          .where('is_deleted')
                          .build();
    return await this.pool.query(updateQuery, [true, false]); 
  }

  public async updateLanguageFieldsById(languageId: number, languageUpdateObject: ILanguageUpdate): Promise<Language> {
    const updateQuery = new UpdateQueryBuilder()
                          .intoTable(TABLE.LANGUAGES)
                          .fieldsToUpdate(...Object.keys(languageUpdateObject))
                          .where('id')
                          .build();
    const result = await this.pool.query(updateQuery, [...Object.values(languageUpdateObject), languageId])                      
    return result.rows[0];
  }
}