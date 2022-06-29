import { Module } from '@nestjs/common';
import { DatabaseService } from '../../db/db.service';
import { LanguageController } from './language.controller';
import { LanguageRepository } from './language.repository';
import { LanguageService } from './language.service';
import { Logger } from '../../utility/logger';
import { DatabaseConfigService } from '../../config/databaseConfig.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [LanguageController],
  providers: [
    LanguageService,
    LanguageRepository, 
    DatabaseService, 
    Logger,
    DatabaseConfigService,
    ConfigService
  ],
  exports: [LanguageService],
})
export class LanguageModule {}