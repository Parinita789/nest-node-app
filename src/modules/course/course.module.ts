import { Module } from '@nestjs/common';
import { DatabaseService } from '../../db/db.service';
import { CourseController } from './course.controller';
import { CourseRepository } from './course.repository';
import { CourseService } from './course.service';
import { Logger } from '../../utility/logger';
import { DatabaseConfigService } from '../../config/databaseConfig.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [CourseController],
  providers: [
    CourseService,
    CourseRepository, 
    DatabaseService, 
    Logger,
    DatabaseConfigService,
    ConfigService
  ],
  exports: [CourseService],
})

export class CourseModule {}