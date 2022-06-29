import { GetLanguageResponse } from './getLanguageResponse.dto';

export class GetLanguagesResponse {
  languages: GetLanguageResponse[];
  record_per_page: number;
  total_count: number;

  constructor(languages: GetLanguageResponse[], record_per_page: number, total_count: number) {
    this.languages = languages;
    this.record_per_page = record_per_page;
    this.total_count = total_count;
  }
}