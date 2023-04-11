import { Injectable } from '@nestjs/common';
import { createToast } from 'src/config/notification/notification';
import { CreateLocationDto, UpdateLocationDto } from './dto';
import { LocationRepository } from './location.repository';

@Injectable()
export class LocationService {
  constructor(private locationRepository: LocationRepository) {}

  async createLocation(userId: number, createLocationDto: CreateLocationDto) {
    const locations = await this.locationRepository.getLocationsByUserId(
      userId,
    );
    const createLocation = await this.locationRepository.createLocation(
      userId,
      {
        isSelected: !locations.length,
        ...createLocationDto,
      },
    );

    return {
      data: createLocation,
      ...createToast({ text: 'Location is added successfully.' }),
    };
  }

  async updateLocation(userId: number, updateLocationDto: UpdateLocationDto) {
    if (updateLocationDto.isSelected) {
      await this.locationRepository.setSelectedLocationToFalse(userId);
    }

    const [result] = await this.locationRepository.updateLocation(
      userId,
      updateLocationDto,
    );

    return {
      data: result,
      ...createToast({ text: 'Location is updated successfully.' }),
    };
  }

  getLocationsByUserId(userId: number) {
    return this.locationRepository.getLocationsByUserId(userId);
  }

  removeLocation(userId: number, id: number) {
    return this.locationRepository.removeLocation(userId, id);
  }
}
