import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserId } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { InitService } from './init.service';

@UseGuards(JwtGuard)
@Controller('init')
export class InitController {
  constructor(private initService: InitService) {}

  @Get()
  init(@UserId() userId: number) {
    return this.initService.init(userId);
  }
}
