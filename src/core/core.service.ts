import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreService {
  getVersion(): string {
    return 'Hello World!';
  }
}
