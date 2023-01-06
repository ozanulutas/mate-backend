import { Controller, Get } from '@nestjs/common';
import { GenderService } from './gender.service';

@Controller('gender')
export class GenderController {
  constructor(private genderService: GenderService) {}

  @Get()
  getGenders() {
    return this.genderService.getGenders();
  }
}
