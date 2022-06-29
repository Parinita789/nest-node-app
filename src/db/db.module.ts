import { Module } from '@nestjs/common';
// import { Logger } from 'src/utility/logger';
import { DatabaseService } from './db.service';
import { DatabaseConfigService } from '../config/databaseConfig.service';

@Module({ 
  providers: [
    DatabaseConfigService,
    DatabaseService
    // Logger, 
  ]
})
export class DatabaseModule {}