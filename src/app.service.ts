import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAlive(): any {
    return { message: `API UP AND RUNNING` };
  }
}
