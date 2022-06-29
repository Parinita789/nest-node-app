export class GetLessonResponse {
  id?: string;
  name: string;
  language_id: string;
  language_code?: string;
  language_name?: string;
  lesson_text: string;
  is_deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
      
  constructor(
    id: string,
    name: string,
    language_id: string,
    language_code: string,
    language_name: string,
    lesson_text: string,
    is_deleted: boolean,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.name = name;
    this.language_id = language_id;
    this.language_code = language_code;
    this.language_name = language_name;
    this.lesson_text = lesson_text;
    this.is_deleted = is_deleted;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}