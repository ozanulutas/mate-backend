import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseEnumPipe,
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
  UnfollowDto,
  RequestFriendshipDto,
  GetChatsQueryDto,
  AcceptFriendshipDto,
  GetFriendshipsQuery,
  UpdateLocationDto,
} from './dto';
import { FriendshipRemoveAction, FriendshipStatus } from './user.constants';
import { UserService } from './user.service';
import { CategoryService } from 'src/category/category.service';

//@TODO: seperate nested routes?
//@TODO: replace @UserId() with @User('userId') for security
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private locationService: LocationService,
    private categoryService: CategoryService,
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

  @Patch(':userId/locations/:locationId')
  updateLocation(
    @UserId() userId: number,
    @Param('locationId', ParseIntPipe) locationId: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.updateLocation(userId, {
      id: locationId,
      ...updateLocationDto,
    });
  }

  @Delete(':userId/locations/:locationId')
  removeLocation(
    @UserId() userId: number,
    @Param('locationId', ParseIntPipe) locationId: number,
  ) {
    return this.locationService.removeLocation(userId, locationId);
  }

  @Get(':userId/feed')
  getFeed(@UserId() userId: number) {
    return this.postService.getFeed(userId);
  }

  @Get(':userId/posts')
  getPosts(@UserId() userId: number) {
    return this.postService.getPostsByUserId(userId);
  }

  @Post(':userId/posts')
  createPosts(@UserId() userId: number, @Body('text') text: string) {
    return this.userService.createPost({ userId, text });
  }

  // @TODO: handle conditions in service
  @Get(':userId/chats')
  getChats(@UserId() userId: number, @Query() query: GetChatsQueryDto) {
    const { count } = query;

    if (count) {
      const shouldCountUnread = count.some((item) => item === 'unread');

      if (shouldCountUnread) {
        return this.userService.getUnreadChatCountInfo(userId);
      }
    }

    return this.messageService.getUserChats(userId);
    // return this.userService.getChats(userId);
  }

  @Get(':userId/messages')
  getMessages(
    @UserId() userId: number,
    @Query('peerId', ParseIntPipe) peerId: number,
  ) {
    return this.userService.getChatMessages(userId, peerId);
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

  @Patch(':userId/messages')
  updateMessagesAsRead(
    @UserId() userId: number,
    @Body('peerId') peerId: number,
  ) {
    return this.messageService.updateMessagesAsRead(userId, peerId);
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

  @Get(':userId/friends')
  getFriendships(
    @UserId() userId: number,
    @Query() query: GetFriendshipsQuery,
  ) {
    const { status, name } = query;

    if (status === FriendshipStatus.REQUESTED) {
      return this.userService.getFriendshipRequests(userId);
    }

    if (status === FriendshipStatus.ACCEPTED) {
      return this.userService.getFriends(userId, name);
    }
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
    @Body() acceptFriendshipDto: AcceptFriendshipDto,
  ) {
    return this.userService.acceptFriendship({
      ...acceptFriendshipDto,
      receiverId: userId,
    });
  }

  @Delete(':userId/friends')
  deleteFriendship(
    @UserId() userId: number,
    @Body('receiverId', ParseIntPipe)
    receiverId: RequestFriendshipDto['receiverId'],
    @Body('removeAction', new ParseEnumPipe(FriendshipRemoveAction))
    removeAction: FriendshipRemoveAction,
  ) {
    return this.userService.deleteFriendship({
      senderId: userId,
      receiverId,
      removeAction,
    });
  }

  @Get(':userId/notifications')
  getNotifications(@UserId() userId: number) {
    return this.notificationService.getUserNotifications(userId);
  }

  @Get(':userId/notifications/count')
  getNotificationCount(
    @UserId() userId: number,
    @Query('isViewed') isViewed: string,
  ) {
    return this.notificationService.getNotificationCount({
      notifierId: userId,
      isViewed:
        isViewed === 'true' ? true : isViewed === 'false' ? false : undefined,
    });
  }

  @Patch(':userId/notifications')
  updateNotificationsAsViewed(@UserId() userId: number) {
    return this.notificationService.updateNotificationsAsViewed(userId);
  }

  @Get(':userId/categories')
  getCategories(@UserId() userId: number) {
    return this.categoryService.getUserCategories(userId);
  }

  @Post(':userId/categories')
  createCategories(
    @UserId() userId: number,
    @Body('categoryIds', new ParseArrayPipe({ items: Number }))
    categoryIds: number[],
  ) {
    return this.categoryService.createUserCategories(userId, categoryIds);
  }

  @Delete(':userId/categories/:userCategoryId')
  removeCategory(
    @UserId() userId: number,
    @Param('userCategoryId', ParseIntPipe)
    userCategoryId: number,
  ) {
    return this.categoryService.removeUserCategory(userId, userCategoryId);
  }
}
