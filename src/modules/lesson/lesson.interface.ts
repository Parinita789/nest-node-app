export interface ILessonUpdate {
  name: string;
  lesson_text: string;
}

export interface ILessonFilter {
  name?: string,
  language_code?: string,
  language_name?: string,
  is_deleted?: boolean,
  limit: string,
  page: string
}

export interface IPaginatedResponse<T> {
  data: T[],
  record_per_page: number,
  total_count: number
}