import { Test, TestingModule } from '@nestjs/testing';
import { LessonService } from './lesson.service';
import { CreateLessonRequestDto } from './dto/request/createLessonRequest.dto';
import { UpdateLessonRequestDto } from './dto/request/updateLessonRequest.dto';
import { Logger } from '../../utility/logger';

class ApiServiceMock {

  createLesson(dto: CreateLessonRequestDto) {
    return [];
  }

  updateLessonById(id: string, dto: UpdateLessonRequestDto) {
    return [];
  }

  getAllLessons() {
    return [];
  }

  deleteLessonById(id: string) {
    return [];
  }
}

describe("Lesson Service Test", () => {

  let lessonService: LessonService;
  const lessonId = 1;

  beforeAll(async () => {
    const ApiServiceProvider = {
        provide: LessonService,
        useClass: ApiServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonService,
        ApiServiceProvider,
        Logger
      ],
    }).compile();
    lessonService = module.get<LessonService>(LessonService);
  })

  it('lessonService - should be defined', () => {
    expect(lessonService).toBeDefined();
  });

  it('should call createLesson method with expected params', async () => {
    const createLessonSpy = jest.spyOn(lessonService, 'createLesson');
    const dto = new CreateLessonRequestDto();
    await lessonService.createLesson(dto);
    expect(createLessonSpy).toHaveBeenCalledWith(dto);
  });

  it('should call getAlllessons method with expected param', async () => {
    const findOneLessonSpy = jest.spyOn(lessonService, 'getAllLessons');
    await lessonService.getAllLessons();
    expect(findOneLessonSpy).toHaveBeenCalledWith();
  });

  it('should call updateLesson method with expected params', async () => {
    const updateLessonSpy = jest.spyOn(lessonService, 'updateLessonById');
    const dto = new UpdateLessonRequestDto();
    await lessonService.updateLessonById(lessonId, dto);
    expect(updateLessonSpy).toHaveBeenCalledWith(lessonId, dto);
  });

  it('should call deleteLesson method with expected param', async () => {
    const deleteLessonSpy = jest.spyOn(lessonService, 'deleteLessonById');
    await lessonService.deleteLessonById(lessonId);
    expect(deleteLessonSpy).toHaveBeenCalledWith(lessonId);
  });
})