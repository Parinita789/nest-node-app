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
    ParseIntPipe,
    Query
  } from '@nestjs/common';
import { CourseService } from './course.service';
import { ValidationPipe } from '../../utility/validationPipe';
import { CourseCreateRequestDto } from './dto/request/createCourseRequest.dto';
import { ResponseDto } from '../../utility/responseDto';
import { GetCourseResponse } from './dto/response/getCourseResponse.dto';
import { GetCoursesResponse } from './dto/response/getCoursesResponse.dto';
import { CreateCourseResponse } from './dto/response/createCourseResponse.dto';
import { Course } from './course.entity';
import { Logger } from '../../utility/logger';
import { RESPONSE } from '../../constants/successMessage';
import { ERRROR } from '../../constants/errorMessage';
import { GetCourseRequestDto } from './dto/request/getCourseRequest.dto';
import { UpdateCourseRequestDto } from './dto/request/updateCourseRequest.dto';
  
@Controller('/course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    private readonly logger: Logger
  ) {}
  
  @Post()
  async createcourse(
    @Body(new ValidationPipe<CourseCreateRequestDto>()) createCourseDto: CourseCreateRequestDto
  ): Promise<ResponseDto<CreateCourseResponse>> {
    try {
      const courseId = await this.courseService.createCourse(createCourseDto);
      return new ResponseDto<CreateCourseResponse>(
        new CreateCourseResponse(courseId),
        RESPONSE.COURSE.CREATED,
        HttpStatus.CREATED
      );
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Patch(':id')
  async updateCourseById(
    @Param('id', new ParseIntPipe()) courseId: number,
    @Body(new ValidationPipe<UpdateCourseRequestDto>()) courseUpdateDto: UpdateCourseRequestDto
  ): Promise<ResponseDto<GetCourseResponse>> {
    try {
      const courseExists = await this.courseService.getCourseById(courseId);
      if (!courseExists) {
        throw new HttpException(ERRROR.COURSE.NOT_FOUND, HttpStatus.NOT_FOUND);
      } else {
        const updatedCourse: Course = await this.courseService.updateCourseById(courseId, courseUpdateDto);
        return new ResponseDto<GetCourseResponse>(
          updatedCourse,
          RESPONSE.COURSE.UPDATED,
          HttpStatus.OK
        )
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async getAllcourse(
    @Query(new ValidationPipe<GetCourseRequestDto>()) getCourseRequestDto: GetCourseRequestDto
  ): Promise<ResponseDto<GetCoursesResponse>> {
  try {
    const result = await this.courseService.getAllCourses(getCourseRequestDto);
    return new ResponseDto<GetCoursesResponse>(
      new GetCoursesResponse(
        result.data.map(course => {
          return new GetCourseResponse(
            course.id,
            course.name,
            course.lessons,
            course.user_first_name,
            course.user_last_name,
            course.active_lesson,
            course.owner_user_id,
            course.is_deleted,
            course.created_at,
            course.updated_at
          );
        }),
        result.record_per_page,
        result.total_count
      ),
      RESPONSE.COURSE.FOUND, 
      HttpStatus.OK
    );
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  @Delete(':id')
  async deleteCourse(
    @Param('id', new ParseIntPipe()) courseId: number
  ): Promise<ResponseDto<any>> {
    try {
      const existingCourse = await this.courseService.getCourseById(courseId);
      if (!existingCourse) {
        throw new HttpException(ERRROR.COURSE.NOT_FOUND, HttpStatus.NOT_FOUND);
      } else {
        await this.courseService.deleteCourseById(courseId)
        return new ResponseDto<any>(
          null,
          RESPONSE.COURSE.DELETED,
          HttpStatus.OK
        )
      }
    } catch (err) {
      this.logger.error(err);
      throw new HttpException(err.response || ERRROR.SERVER_ERROR, err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}