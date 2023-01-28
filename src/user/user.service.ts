import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateUserDto, SearchDto } from './dto';
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

  async getUserById(id: number) {
    const user = await this.userRepository.getUserById(id);

    const normalizedUser = {
      ...user,
      userCategory: user.userCategory.map(({ category }) => category),
      following: user.following.map(({ following }) => following),
      followedBy: user.followedBy.map(({ follower }) => follower),
    };

    return normalizedUser;
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
}
