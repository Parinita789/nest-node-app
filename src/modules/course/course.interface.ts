export interface ICourseFilter {
  name?: string,
  owner_user_id?: number,
  is_deleted?: boolean,
  limit?: string,
  page?: string
}

export interface IUpdateCourse {
  lesson_ids?: string[],
  name?: string,
  active_lesson?: number
}

export interface ICourseOwner {
  id: number,
  first_name: string,
  last_name: string
}

export interface ICourseLesson {
  id: number,
  name: string,
  lesson_text: string,
  language_taught: string,
  language_code: string
}