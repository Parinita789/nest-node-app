import { Module } from '@nestjs/common';
import { DatabaseService } from '../../db/db.service';
import { DatabaseConfigService } from '../../config/databaseConfig.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { Logger } from '../../utility/logger';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [
    UserService, 
    UserRepository, 
    DatabaseService, 
    Logger,
    DatabaseConfigService,
    ConfigService
  ],
  exports: [UserService],
})
export class UserModule {}