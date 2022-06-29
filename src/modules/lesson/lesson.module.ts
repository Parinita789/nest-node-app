import { Module } from '@nestjs/common';
import { DatabaseService } from '../../db/db.service';
import { LessonController } from './lesson.controller';
import { LessonRepository } from './lesson.repository';
import { LessonService } from './lesson.service';
import { Logger } from '../../utility/logger';
import { DatabaseConfigService } from '../../config/databaseConfig.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [LessonController],
  providers: [
    LessonService,
    LessonRepository, 
    DatabaseService, 
    Logger,
    DatabaseConfigService,
    ConfigService
  ],
  exports: [LessonService],
})
export class LessonModule {}