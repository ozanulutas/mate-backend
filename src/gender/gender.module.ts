import { Module } from '@nestjs/common';
import { GenderController } from './gender.controller';
import { GenderRepository } from './gender.repository';
import { GenderService } from './gender.service';

@Module({
  controllers: [GenderController],
  providers: [GenderService, GenderRepository],
})
export class GenderModule {}
