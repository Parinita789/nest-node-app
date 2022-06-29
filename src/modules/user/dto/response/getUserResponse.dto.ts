export class GetUserResponse {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  profile_picture_url: string;
  created_at: Date;
  updated_at: Date;
  
  constructor(
    id: number,
    first_name: string,
    last_name: string,
    user_name: string,
    profile_picture_url: string,
    created_at: Date,
    updated_at: Date,
  ) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.user_name = user_name;
    this.profile_picture_url = profile_picture_url;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}