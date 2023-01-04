import { Controller, Get } from '@nestjs/common';
import { SexService } from './sex.service';

@Controller('sex')
export class SexController {
  constructor(private sexService: SexService) {}

  @Get()
  getSexes() {
    return this.sexService.getSexes();
  }
}
