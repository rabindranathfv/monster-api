import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configServ: ConfigService) {}
  getAlive(): any {
    return {
      message: `API UP AND RUNNING, in ENV: ${this.configServ.get('NODE_ENV')} and PORT: ${this.configServ.get('PORT')}`,
    };
  }
}
