import { Injectable } from '@nestjs/common';
import { createToast } from 'src/config/notification/notification';
import { CreateLocationDto } from './dto';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  async createLocation(userId: number, createLocationDto: CreateLocationDto) {
    return {
      data: await this.locationRepository.createLocation(
        userId,
        createLocationDto,
      ),
      ...createToast({ text: 'Location is added successfully.' }),
    };
  }
}
