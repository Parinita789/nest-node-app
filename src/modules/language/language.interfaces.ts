export interface ILanguageUpdate {
  name?: string,
  code?: string
}

export interface ILanguageFilter {
  name?: string,
  code?: string,
  is_deleted?: false,
  limit?: string,
  page?: string
}