import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserId } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ParseIntPipe, ParseFloatPipe } from 'src/config/pipes';
import { CreateLocationDto } from 'src/location/dto';
import { LocationService } from 'src/location/location.service';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private locationService: LocationService,
  ) {}

  @Get('search')
  search(
    @Query('lon', ParseFloatPipe) lon: number,
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('distance', ParseFloatPipe) distance: number,
    @Query('categories', new ParseArrayPipe({ items: Number }))
    categories: number[],
  ) {
    return this.userService.search({ lon, lat, distance, categories });
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  @Post(':userId/locations')
  createLocation(
    @UserId() userId: number,
    @Body() createLocationDto: CreateLocationDto,
  ) {
    return this.locationService.createLocation(userId, createLocationDto);
  }

  @Get(':userId/locations')
  getLocations(@UserId() userId: number) {
    return this.locationService.getLocations(userId);
  }
}
