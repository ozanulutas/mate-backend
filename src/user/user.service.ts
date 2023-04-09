import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import {
  AcceptFriendshipDto,
  CreateUserDto,
  DeleteFriendshipDto,
  FollowDto,
  RequestFriendshipDto,
  SearchDto,
  UnfollowDto,
} from './dto';
import { UserRepository } from './user.repository';
import {
  CredentialsTakenException,
  DuplicatedFriendshipRequestException,
  FriendshipRequestNotFoundException,
} from 'src/config/exceptions';
import { FriendshipRespondedEvent } from './events';
import { Event } from './user.constants';
import { MessageService } from 'src/message/message.service';
import { SocketClientProvider } from 'src/socket/socket-client.provider';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationType } from 'src/notification/notification.constants';
import { PostService } from 'src/post/post.service';
import { CreatePostDto } from 'src/post/dto';
import { createToast } from 'src/config/notification/notification';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private messageService: MessageService,
    private eventEmitter: EventEmitter2,
    private socketClient: SocketClientProvider,
    private notificationService: NotificationService,
    private postService: PostService,
  ) {}

  getUsers() {
    return this.userRepository.getUsers();
  }

  getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
  }

  async getUserById(id: number, requesterId: number) {
    const { followers, friends, symmetricFriends, ...user } =
      await this.userRepository.getUserById(id, requesterId);

    const normalizedUser = {
      ...user,
      categories: user?.categories.map(({ category }) => category),
      friendshipInfo: friends[0] ?? symmetricFriends[0] ?? null,
      isFollowedByMe: followers.some(
        ({ followerId }) => followerId === requesterId,
      ),
    };

    return normalizedUser;
  }

  getUserFollowers(userId: number) {
    return this.userRepository.getUserFollowers(userId);
  }

  getUserFollowings(userId: number) {
    return this.userRepository.getUserFollowings(userId);
  }

  getUserConfig(userId: number) {
    return this.userRepository.getUserConfig(userId);
  }

  search(searchDto: SearchDto) {
    return this.userRepository.search(searchDto);
  }

  async createUser(createUserDto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    try {
      return await this.userRepository.createUser({
        ...createUserDto,
        password: passwordHash,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new CredentialsTakenException();
        }
      }

      throw error;
    }
  }

  async follow(followDto: FollowDto) {
    const { followerId, followingId } = followDto;
    const result = await this.userRepository.follow(followDto);

    await this.notificationService.createNotification({
      actorId: followerId,
      entityId: followingId,
      notificationTypeId: NotificationType.FOLLOWED,
      notifierIds: [followingId],
    });

    return result;
  }

  unfollow(unfollowDto: UnfollowDto) {
    return this.userRepository.unfollow(unfollowDto);
  }

  getFriendshipRequests(receiverId: number) {
    return this.userRepository.getFriendshipRequests(receiverId);
  }

  async getFriends(userId: number, name = '') {
    const { friends, symmetricFriends } = await this.userRepository.getFriends(
      userId,
      name,
    );

    return [
      ...friends.map(({ sender }) => sender),
      ...symmetricFriends.map(({ receiver }) => receiver),
    ];
  }

  async requestFriendship(requestFriendshipDto: RequestFriendshipDto) {
    const { receiverId, senderId } = requestFriendshipDto;
    const [requestedFriendship] =
      await this.userRepository.getFriendshipRequest(senderId, receiverId);

    if (requestedFriendship?.id) {
      throw new DuplicatedFriendshipRequestException();
    }

    const result = await this.userRepository.requestFriendship(
      requestFriendshipDto,
    );

    this.socketClient.eventEmitter.newFriendshipRequest(receiverId, senderId);

    return result;
  }

  async acceptFriendship(acceptFriendshipDto: AcceptFriendshipDto) {
    const result = await this.userRepository.acceptFriendship(
      acceptFriendshipDto,
    );

    if (result.count === 0) {
      throw new FriendshipRequestNotFoundException();
    }

    this.eventEmitter.emit(
      Event.FRIENDSHIP_RESPONDED,
      new FriendshipRespondedEvent(acceptFriendshipDto),
    );

    return result;
  }

  async deleteFriendship(deleteFriendshipDto: DeleteFriendshipDto) {
    const result = await this.userRepository.deleteFriendship(
      deleteFriendshipDto,
    );

    if (result.count > 0) {
      this.socketClient.eventEmitter.friendshipRemoved(deleteFriendshipDto);
    }

    return result;
  }

  async getChats(userId: number) {
    const [unreadChatInfo, userChats] = await Promise.all([
      this.messageService.getUnreadChatInfo(userId),
      this.messageService.getUserChats(userId),
    ]);

    const userChatsWithUnreadInfo = userChats.reduce<
      (typeof userChats[0] & { unreadMessageCount: number })[]
    >((acc, chat) => {
      const unreadChat = unreadChatInfo.find(
        (item) => item.senderId === chat.userId,
      );

      return [
        ...acc,
        {
          ...chat,
          unreadMessageCount: unreadChat ? unreadChat._count : 0,
        },
      ];
    }, []);

    return userChatsWithUnreadInfo;
  }

  getChatMessages(userId: number, peerId: number) {
    return this.messageService.getUserChatMessages(userId, +peerId);
  }

  getUnreadChatCountInfo(userId: number) {
    return this.messageService.getUnreadChatInfo(userId);
  }

  async createPost(createPostDto: CreatePostDto) {
    return {
      data: await this.postService.createPost(createPostDto),
      ...createToast({ text: 'Post is published.' }),
    };
  }
}
