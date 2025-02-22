import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfiguration } from './config/configuration';

@Injectable()
export class AppService {

  constructor(
    @Inject() private configService: ConfigService
  ) {}
  
  getAppConfig() {
    return this.configService.getOrThrow<ApplicationConfiguration["app"]>('app');
  }

  getDatabaseConfig() {
    return this.configService.getOrThrow<ApplicationConfiguration["database"]>('database');
  }
}
