import { Test, TestingModule } from '@nestjs/testing';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { CreateLessonRequestDto } from './dto/request/createLessonRequest.dto';
import { UpdateLessonRequestDto } from './dto/request/updateLessonRequest.dto';
import { Logger } from '../../utility/logger';
import { SearchLessonRequestDto } from './dto/request/searchLessonRequest.dto';

describe("Lesson Controller Unit Tests", () => {
  let lessonController: LessonController;
  let spyService: LessonService;
  const lessonId = 1;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: LessonService,
      useFactory: () => ({
        createLesson: jest.fn(() => {}),
        getAllLessons: jest.fn(() => {}),
        updateLessonFieldsById: jest.fn(() => { }),
        deleteLesson: jest.fn(() => {})
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LessonController],
      providers: [ LessonService, ApiServiceProvider, Logger],
    }).compile();

    lessonController = app.get<LessonController>(LessonController);
    spyService = app.get<LessonService>(LessonService);
  })

  it("calling createLesson method", async () => {
    const dto = new CreateLessonRequestDto();
    const result = await lessonController.createLesson(dto)
    expect(result).not.toEqual(null);
    expect(spyService.createLesson).toHaveBeenCalled();
    expect(spyService.createLesson).toHaveBeenCalledWith(dto);
  })

  it("calling getAllLessons method", async () => {
    const dto = new SearchLessonRequestDto()
    await lessonController.getAllLessons(dto);
    expect(spyService.getAllLessons).toHaveBeenCalled();
  })

  it("calling updateLessonById method", async () => { 
    const dto = new UpdateLessonRequestDto();
    await lessonController.updateLessonFieldsById(lessonId, dto);
    expect(spyService.updateLessonById).toHaveBeenCalled();
    expect(spyService.updateLessonById).toHaveBeenCalledWith(lessonId, dto);
  })

  it("calling deleteLesson method", async () => {
    await lessonController.deleteLesson(lessonId);
    expect(spyService.deleteLessonById).toHaveBeenCalled();
    expect(spyService.deleteLessonById).toHaveBeenCalledWith(lessonId);
  })

});