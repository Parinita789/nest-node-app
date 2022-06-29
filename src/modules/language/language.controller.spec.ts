import { Test, TestingModule } from '@nestjs/testing';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { CreateLanguageRequestDto } from './dto/request/createLanguageRequest.dto';
import { LanguageUpdateRequestDto } from './dto/request/updateLanguageRequest.dto';
import { Logger } from '../../utility/logger';
import { SearchLanguageRequestDto } from './dto/request/searchLanguageRequest.dto';

describe("Language Controller Unit Tests", () => {
  let languageController: LanguageController;
  let spyService: LanguageService;
  const languageId = 1; 

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: LanguageService,
      useFactory: () => ({
        createLanguage: jest.fn(() => {}),
        getAllLanguages: jest.fn(() => {}),
        updateLanguageFieldsById: jest.fn(() => { }),
        deleteLanguage: jest.fn(() => {}),
        deleteAllLanguages: jest.fn(() => {})
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LanguageController],
      providers: [ LanguageService, ApiServiceProvider, Logger],
    }).compile();

    languageController = app.get<LanguageController>(LanguageController);
    spyService = app.get<LanguageService>(LanguageService);
  })

  it("calling createLanguage method", async () => {
    const dto = new CreateLanguageRequestDto();
    const result = await languageController.createLanguage(dto)
    expect(result).not.toEqual(null);
    expect(spyService.createLanguage).toHaveBeenCalled();
    expect(spyService.createLanguage).toHaveBeenCalledWith(dto);
  })

  it("calling getAllLanguages method", async () => {
    const dto = new SearchLanguageRequestDto()
    await languageController.getAllLanguages(dto)
    expect(spyService.getAllLanguages).toHaveBeenCalled();
  })

  it("calling updateLanguageFieldsById method", async () => { 
    const dto = new LanguageUpdateRequestDto();
    await languageController.updateLanguageFieldsById(languageId, dto);
    expect(spyService.updateLanguageById).toHaveBeenCalled();
    expect(spyService.updateLanguageById).toHaveBeenCalledWith(languageId, dto);
  })

  it("calling deleteLanguage method", async () => {
    await languageController.deleteLanguage(languageId);
    expect(spyService.deleteLanguageById).toHaveBeenCalled();
    expect(spyService.deleteLanguageById).toHaveBeenCalledWith(languageId);
  })

  it("calling deleteAllLanguages method", async () => {
    await languageController.deleteAllLanguages();
    expect(spyService.deleteAllLanguages).toHaveBeenCalled();
    expect(spyService.deleteAllLanguages).toHaveBeenCalledWith(languageId);
  })

});