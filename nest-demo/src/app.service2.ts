import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService2 {
  getHello() {
    return 'Hello AppService2';
  }
}
