import { 
  Controller, 
  Post, 
  Body, 
  Get,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  ParseIntPipe
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { ValidationPipe } from '../../utility/validationPipe';
import { CreateLessonRequestDto } from './dto/request/createLessonRequest.dto';
import { ResponseDto } from '../../utility/responseDto';
import { GetLessonResponse } from './dto/response/getLessonResponse.dto';
import { GetLessonsResponse } from './dto/response/getLessonsResponse.dto';
import { LessonRequestResponse } from './dto/response/createLessonResponse.dto';
import { Lesson } from './lesson.entity';
import { Logger } from '../../utility/logger';
import { RESPONSE } from '../../constants/successMessage';
import { UpdateLessonRequestDto } from './dto/request/updateLessonRequest.dto';
import { SearchLessonRequestDto } from './dto/request/searchLessonRequest.dto';
import { ERRROR } from '../../constants/errorMessage';
  
@Controller('/lesson')
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly logger: Logger
  ) {}
  
  @Post()
  async createLesson(
    @Body(new ValidationPipe<CreateLessonRequestDto>()) createLessonDto: CreateLessonRequestDto
  ): Promise<ResponseDto<LessonRequestResponse>> {
    try {
      const lessonId = await this.lessonService.createLesson(createLessonDto);
      return new ResponseDto<LessonRequestResponse>(
        new LessonRequestResponse(lessonId),
        RESPONSE.LESSON.CREATED,
        HttpStatus.CREATED
      );
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Patch(':id')
  async updateLessonFieldsById(
    @Param('id', new ParseIntPipe()) lessonId: number,
    @Body(new ValidationPipe<UpdateLessonRequestDto>()) lessonUpdateDto: UpdateLessonRequestDto
  ): Promise<ResponseDto<GetLessonResponse>> {
    try {
      const exisitingLesson = await this.lessonService.findOneLesson({ id: lessonId, is_deleted: false });
      if (!exisitingLesson) {
        throw new HttpException(ERRROR.LESSON.NOT_FOUND, HttpStatus.CONFLICT);
      } else { 
        const updatedLesson: Lesson = await this.lessonService.updateLessonById(lessonId, lessonUpdateDto);
        return new ResponseDto<GetLessonResponse>(
          updatedLesson,
          RESPONSE.LESSON.UPDATED,
          HttpStatus.OK
        )
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllLessons(
    @Query(new ValidationPipe<SearchLessonRequestDto>()) SearchLessonRequestDto: SearchLessonRequestDto
  ): Promise<ResponseDto<GetLessonsResponse>> {
    try {
      const result = await this.lessonService.getAllLessons(SearchLessonRequestDto);
      return new ResponseDto<GetLessonsResponse>(
        new GetLessonsResponse(
          result.data.map(lesson => {
            return new GetLessonResponse(
              lesson.id,
              lesson.name,
              lesson.language_id,
              lesson.language_code,
              lesson.language_name,
              lesson.lesson_text,
              lesson.is_deleted,
              lesson.created_at,
              lesson.updated_at
            );
          }),
          result.record_per_page,
          result.total_count
        ),
        RESPONSE.LESSON.FOUND, 
        HttpStatus.OK
      );
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Delete(':id')
  async deleteLesson(
    @Param('id', new ParseIntPipe()) lessonId: number
  ): Promise<ResponseDto<any>> {
    try {
      const exisitingLesson = await this.lessonService.findOneLesson({ id: lessonId, is_deleted: false });
      if (!exisitingLesson) {
        throw new HttpException(ERRROR.LESSON.NOT_FOUND, HttpStatus.CONFLICT);
      } else {
        await this.lessonService.deleteLessonById(lessonId)
        return new ResponseDto<any>(
          null,
          RESPONSE.LESSON.DELETED,
          HttpStatus.OK
        )
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}