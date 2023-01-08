import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { CreateUserDto } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUsers() {
    return this.userRepository.getUsers();
  }

  getUserByEmail(email: string) {
    return this.userRepository.getUserByEmail(email);
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
          throw new ForbiddenException('Credantials taken');
        }
      }

      throw error;
    }
  }
}
