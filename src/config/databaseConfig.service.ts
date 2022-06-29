import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface IDatabaseConfig {
  user: string;
  host: number;
  database: string;
  password: string;
  port: number
}

@Injectable()
export class DatabaseConfigService {

  constructor(
    private configService: ConfigService
  ) {}

  public getDatabaseConfig = (): IDatabaseConfig => {
    return {
      user: this.configService.get<string>('POSTGRES_USER'),
      host: this.configService.get<number>('POSTGRES_HOST'),
      database: this.configService.get<string>('POSTGRES_DB'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),
      port: this.configService.get<number>('POSTGRES_LOCAL_PORT'),
    }
  }  
}