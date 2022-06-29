export class GetLanguageResponse {
  id?: string;
  name: string;
  code: string;
  is_deleted?: boolean;
  created_at?: Date;
  updated_at?: Date;
    
  constructor(
    id: string,
    name: string,
    code: string,
    is_deleted: boolean,
    created_at: Date,
    updated_at: Date
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.is_deleted = is_deleted;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}