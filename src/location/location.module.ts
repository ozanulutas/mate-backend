import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationRepository } from './location.repository';
import { LocationService } from './location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationRepository, LocationService],
  exports: [LocationService],
})
export class LocationModule {}
