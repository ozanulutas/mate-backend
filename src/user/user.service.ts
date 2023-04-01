import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import {
  CreateUserDto,
  DeleteFriendshipDto,
  FollowDto,
  RequestFriendshipDto,
  SearchDto,
  UnfollowDto,
  UpdateFriendshipDto,
} from './dto';
import { UserRepository } from './user.repository';
import { CredentialsTakenException } from 'src/config/exceptions';
import { FriendshipRequestedEvent, FriendshipRespondedEvent } from './events';
import { Event } from './user.constants';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private eventEmitter: EventEmitter2,
    private messageService: MessageService,
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

    const [friendshipStatusWithMe] = [...friends, ...symmetricFriends].map(
      ({ friendshipStatusId }) => friendshipStatusId,
    );

    const normalizedUser = {
      ...user,
      categories: user?.categories.map(({ category }) => category),
      friendshipStatusWithMe: friendshipStatusWithMe ?? null,
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

  follow(followDto: FollowDto) {
    return this.userRepository.follow(followDto);
  }

  unfollow(unfollowDto: UnfollowDto) {
    return this.userRepository.unfollow(unfollowDto);
  }

  getFriendshipRequests(receiverId: number) {
    return this.userRepository.getFriendshipRequests(receiverId);
  }

  async requestFriendship(requestFriendshipDto: RequestFriendshipDto) {
    const result = await this.userRepository.requestFriendship(
      requestFriendshipDto,
    );

    this.eventEmitter.emit(
      Event.FRIENDSHIP_REQUESTED,
      new FriendshipRequestedEvent(requestFriendshipDto),
    );

    return result;
  }

  async updateFriendship(updateFriendshipDto: UpdateFriendshipDto) {
    const result = await this.userRepository.updateFriendship(
      updateFriendshipDto,
    );

    this.eventEmitter.emit(
      Event.FRIENDSHIP_RESPONDED,
      new FriendshipRespondedEvent(updateFriendshipDto),
    );

    return result;
  }

  async deleteFriendship(deleteFriendshipDto: DeleteFriendshipDto) {
    const result = await this.userRepository.deleteFriendship(
      deleteFriendshipDto,
    );

    this.eventEmitter.emit(
      Event.FRIENDSHIP_RESPONDED,
      new FriendshipRespondedEvent(deleteFriendshipDto),
    );

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
}
