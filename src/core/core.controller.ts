import { Controller, Get } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller('/core')
export class CoreController {
  constructor(private coreService: CoreService) {}

  @Get('/version')
  getHello(): string {
    return this.coreService.getVersion();
  }
}
