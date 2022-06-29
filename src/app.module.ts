import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './db/db.module';
import { HttpExceptionFilter } from './utility/exceptionFilter';
import { LanguageModule } from './modules/language/language.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { CourseModule } from './modules/course/course.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    UserModule,
    LanguageModule,
    LessonModule,
    CourseModule,
    DatabaseModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})

export class AppModule {}
