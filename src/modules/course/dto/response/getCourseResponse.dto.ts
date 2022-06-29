import { ICourseOwner, ICourseLesson } from "../../course.interface";

export class GetCourseResponse {
  id?: string;
  name: string;
  lessons?: ICourseLesson[];
  active_lesson?: string;
  owner?: ICourseOwner;
  is_deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
        
  constructor(
    id: string,
    name: string,
    lessons: ICourseLesson[],
    user_first_name: string,
    user_last_name: string,
    active_lesson: string,
    owner_user_id: number,
    is_deleted: boolean,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.name = name;
    this.owner = {
      id: owner_user_id,
      first_name: user_first_name,
      last_name: user_last_name
    }
    this.lessons = lessons;
    this.active_lesson = active_lesson;
    this.is_deleted = is_deleted;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}