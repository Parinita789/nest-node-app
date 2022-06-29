import { ICourseOwner, ICourseLesson } from "./course.interface";

export class Course {
  id?: string;
  name: string;
  owner_user_id: number;
  owner?: ICourseOwner;
  lessons?: ICourseLesson[];
  user_first_name?: string;
  user_last_name?: string;
  active_lesson?: string;
  lesson_ids?: number[];
  is_deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
}