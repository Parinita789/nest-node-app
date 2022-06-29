import { Injectable } from '@nestjs/common';
import { IPaginatedResponse } from '../lesson/lesson.interface';
import { Language } from './language.entity';
import { ILanguageFilter, ILanguageUpdate } from './language.interfaces';
import { LanguageRepository } from './language.repository';

@Injectable()
export class LanguageService {
  constructor(
    public readonly languageRepository: LanguageRepository
  ) {}

  async createLanguage(language: Language): Promise<number> {
    return this.languageRepository.crateLanguage(language);
  }

  public async findOneLanguage(findObject: object): Promise<Language> {
    return this.languageRepository.findOneLanguage(findObject);
  }

  public async getAllLanguages(languageFilter: ILanguageFilter): Promise<IPaginatedResponse<Language>> {
    return this.languageRepository.getAllLanguages(languageFilter)
  }

  public async updateLanguageById(languageId: number, languageUpdateObject: ILanguageUpdate): Promise<Language> {
    return this.languageRepository.updateLanguageFieldsById(languageId, languageUpdateObject)
  }

  public async deleteLanguageById(languageId: number): Promise<void> {
    return this.languageRepository.deleteLanguageById(languageId);
  }

  public async deleteAllLanguages(): Promise<void> {
    return this.languageRepository.deleteAllLanguages();
  }

}
