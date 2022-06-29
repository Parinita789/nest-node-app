import { Injectable } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';

@Injectable()
export class Logger implements LoggerService {  

  public log(message: string): void {
    console.info(message);
  }

  public error(message: string): void {
    console.error(message);
  }

  public warn(message: string): void {
    console.warn(message);
  }
}
