import {
  Body,
  Controller,
  Delete,
  Get,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User, UserId } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { ParseFloatPipe } from 'src/config/pipes';
import { CreateLocationDto } from 'src/location/dto';
import { LocationService } from 'src/location/location.service';
import { MessageService } from 'src/message/message.service';
import { NotificationService } from 'src/notification/notification.service';
import { PostService } from 'src/post/post.service';
import {
  CreateMessageDto,
  FollowDto,
  GetChatDto,
  UnfollowDto,
  RequestFriendshipDto,
  UpdateFriendshipDto,
} from './dto';
import { UserService } from './user.service';

//@TODO: seperate nested routes?
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private locationService: LocationService,
    private postService: PostService,
    private messageService: MessageService,
    private notificationService: NotificationService,
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
  getUserById(@UserId() id: number, @User('userId') requesterId: number) {
    return this.userService.getUserById(id, requesterId);
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

  @Get(':userId/chats')
  getChat(@UserId() userId: number, @Query() query: GetChatDto) {
    const { peerId } = query;
    return peerId
      ? this.messageService.getUserChat(userId, +peerId) // @TODO: separate as get messages?
      : this.messageService.getUserChats(userId);
  }

  @Post(':userId/messages')
  createMessage(
    @UserId() userId: number,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.messageService.createMessage({
      ...createMessageDto,
      senderId: userId,
    });
  }

  @Get(':userId/followers')
  getUserFollowers(@UserId() id: number) {
    return this.userService.getUserFollowers(id);
  }

  @Get(':userId/followings')
  getUserFollowings(@UserId() id: number) {
    return this.userService.getUserFollowings(id);
  }

  @Post(':userId/followings')
  follow(
    @UserId() userId: number,
    @Body('followingId', ParseIntPipe) followingId: FollowDto['followingId'],
  ) {
    return this.userService.follow({ followingId, followerId: userId });
  }

  @Delete(':userId/followings')
  unfollow(
    @UserId() userId: number,
    @Body('followingId', ParseIntPipe) followingId: UnfollowDto['followingId'],
  ) {
    return this.userService.unfollow({ followingId, followerId: userId });
  }

  @Post(':userId/friends')
  requestFriendship(
    @UserId() userId: number,
    @Body('receiverId', ParseIntPipe)
    receiverId: RequestFriendshipDto['receiverId'],
  ) {
    return this.userService.requestFriendship({ senderId: userId, receiverId });
  }

  @Patch(':userId/friends')
  updateFriendship(
    @UserId() userId: number,
    @Body() updateFriendshipDto: UpdateFriendshipDto,
  ) {
    return this.userService.updateFriendship({
      ...updateFriendshipDto,
      senderId: userId,
    });
  }

  @Delete(':userId/friends')
  deleteFriendship(
    @UserId() userId: number,
    @Body('receiverId', ParseIntPipe)
    receiverId: RequestFriendshipDto['receiverId'],
  ) {
    return this.userService.deleteFriendship({ senderId: userId, receiverId });
  }

  @Get(':userId/notifications')
  getNotifications(@UserId() userId: number) {
    return this.notificationService.getUserNotifications(userId);
  }
}
