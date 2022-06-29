import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../db/db.service';
import { User } from './user.entity';
import { 
  SearchQueryBuilder, 
  InsertQueryBuilder, 
  UpdateQueryBuilder 
} from '../../db/queryBuilder';
import { TABLE } from '../../constants/tableName';

@Injectable()
export class UserRepository {
  private pool;

  constructor( 
    private readonly db: DatabaseService
  ) {
    this.pool = db.pool;
  }

  public async createUser(user: User): Promise<number> {
    const insertQuery = new InsertQueryBuilder()
                          .intoTable(TABLE.USERS)
                          .fieldsToInsert(...Object.keys(user))
                          .build();
    const result = await this.pool.query(insertQuery, [...Object.values(user)])
    return result.rows[0].id;
  }

  public async findOneUser(findObject: object): Promise<User> {
    const existingUserQuery = new SearchQueryBuilder()
                          .select(...Object.keys(findObject))
                          .fromTable(TABLE.USERS)
                          .where(...Object.keys(findObject))
                          .build();

    const result = await this.pool.query(existingUserQuery, [...Object.values(findObject)]);
    return result.rows[0];
  }

  public async getUserById(userId: number): Promise<User> {
    const searchQuery = new SearchQueryBuilder()
                          .select(
                            'id',
                            'first_name', 
                            'last_name', 
                            'user_name', 
                            'is_deleted',
                            'profile_picture_url', 
                            'created_at',
                            'updated_at'
                          )
                          .fromTable(TABLE.USERS)
                          .where('id')
                          .build();
    console.log(" searchQuery >>> ", searchQuery, userId)
    const result = await this.pool.query(searchQuery, [userId]);                
    return result.rows[0];
  }

  public async deleteUserById(userId: number): Promise<void> {
    const updateQuery = new UpdateQueryBuilder()
                          .intoTable(TABLE.USERS)
                          .fieldsToUpdate('is_deleted')
                          .where('id')
                          .build()
    return await this.pool.query(updateQuery, [false, userId]);                      
  }

  public async updateUserById(userId: number, fieldsToUpdate: object): Promise<User> {
    const updateQuery = new UpdateQueryBuilder()
                          .intoTable(TABLE.USERS)
                          .fieldsToUpdate(...Object.keys(fieldsToUpdate))
                          .where('id')
                          .build();
    const result = await this.pool.query(updateQuery, [...Object.values(fieldsToUpdate), userId]);  
    return  result.rows[0];                   
  }
}