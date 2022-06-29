import { Test, TestingModule } from '@nestjs/testing';
import { LanguageService } from './language.service';
import { CreateLanguageRequestDto } from './dto/request/createLanguageRequest.dto';
import { LanguageUpdateRequestDto } from './dto/request/updateLanguageRequest.dto';
import { Logger } from '../../utility/logger';

class ApiServiceMock {

  createLanguage(dto: CreateLanguageRequestDto) {
    return [];
  }

  updateLanguageById(id: string, dto: LanguageUpdateRequestDto) {
    return [];
  }

  getAllLanguages() {
    return [];
  }

  deleteLanguageById(id: string) {
    return [];
  }

  deleteAllLanguages(id: string) {
    return [];
  }
}

describe("Language Service Test", () => {

  let languageService: LanguageService;
  const languageId = 1;

  beforeAll(async () => {
    const ApiServiceProvider = {
        provide: LanguageService,
        useClass: ApiServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguageService,
        ApiServiceProvider,
        Logger
      ],
    }).compile();
    languageService = module.get<LanguageService>(LanguageService);
  })

  it('languageService - should be defined', () => {
    expect(languageService).toBeDefined();
  });

  it('should call createLanguage method with expected params', async () => {
    const createLanguageSpy = jest.spyOn(languageService, 'createLanguage');
    const dto = new CreateLanguageRequestDto();
    await languageService.createLanguage(dto);
    expect(createLanguageSpy).toHaveBeenCalledWith(dto);
  });

  it('should call getAlllanguages method with expected param', async () => {
    const findOneLanguageSpy = jest.spyOn(languageService, 'getAllLanguages');
    await languageService.getAllLanguages({});
    expect(findOneLanguageSpy).toHaveBeenCalledWith({});
  });

  it('should call updateLanguageById method with expected params', async () => {
    const updateLanguageSpy = jest.spyOn(languageService, 'updateLanguageById');
    const dto = new LanguageUpdateRequestDto();
    await languageService.updateLanguageById(languageId, dto);
    expect(updateLanguageSpy).toHaveBeenCalledWith(languageId, dto);
  });

  it('should call deleteLanguageById method with expected param', async () => {
    const deleteLanguageSpy = jest.spyOn(languageService, 'deleteLanguageById');
    await languageService.deleteLanguageById(languageId);
    expect(deleteLanguageSpy).toHaveBeenCalledWith(languageId);
  });

  it('should call deleteAllLanguages method with expected param', async () => {
    const deleteLanguageSpy = jest.spyOn(languageService, 'deleteLanguageById');
    await languageService.deleteAllLanguages();
    expect(deleteLanguageSpy).toHaveBeenCalled();
  });
})