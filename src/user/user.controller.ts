import {
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserId } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ParseFloatPipe } from 'src/config/pipes';
import { CreateLocationDto } from 'src/location/dto';
import { LocationService } from 'src/location/location.service';
import { PostService } from 'src/post/post.service';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private locationService: LocationService,
    private postService: PostService,
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

  @Get(':userId')
  getUserById(@UserId() id: number) {
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
    return this.locationService.getLocationsByUserId(userId);
  }

  @Get(':userId/feed')
  getFeed(@UserId() userId: number) {
    return this.postService.getFeed(userId);
  }

  @Get(':userId/posts')
  getPosts(@UserId() userId: number) {
    return this.postService.getPostsByUserId(userId);
  }
}
