export class ResponseDto<Data> {
  data: Data;
  message: string;
  status: number;
  
  constructor(data: Data, message: string, status: number) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}
