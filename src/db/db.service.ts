import { Injectable } from '@nestjs/common';
import { Client, Pool } from 'pg';
import { DatabaseConfigService, IDatabaseConfig } from '../config/databaseConfig.service';

@Injectable()
export class DatabaseService {
  public client: Client;
  public pool: Pool;
  private connectionOptions: IDatabaseConfig = this.databaseConfigService.getDatabaseConfig();
  
  constructor(
    private readonly databaseConfigService: DatabaseConfigService,
  ) {
    this.pool = new Pool(this.connectionOptions);
  }

}
  
