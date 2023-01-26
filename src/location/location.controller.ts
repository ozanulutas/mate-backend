import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CreateLocationDto } from './dto';
import { LocationService } from './location.service';

// @TODO: move this under user controller
@UseGuards(JwtGuard)
@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Post()
  createLocation(
    @User('userId') userId: number,
    @Body() createLocationDto: CreateLocationDto,
  ) {
    return this.locationService.createLocation(userId, createLocationDto);
  }

  @Get()
  getLocations(@User('userId') userId: number) {
    return this.locationService.getLocations(userId);
  }
}
