import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { LocationService } from './location.service';

@UseGuards(JwtGuard)
@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) {}
}
