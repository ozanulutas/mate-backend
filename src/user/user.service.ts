import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

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

  requestFriendship(requestFriendshipDto: RequestFriendshipDto) {
    return this.userRepository.requestFriendship(requestFriendshipDto);
  }

  updateFriendship(updateFriendshipDto: UpdateFriendshipDto) {
    return this.userRepository.updateFriendship(updateFriendshipDto);
  }

  deleteFriendship(deleteFriendshipDto: DeleteFriendshipDto) {
    return this.userRepository.deleteFriendship(deleteFriendshipDto);
  }
}
