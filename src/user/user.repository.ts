import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, GetUserByEmailDto } from './dto';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  getUserByEmail(getUserByEmailDto: GetUserByEmailDto) {
    return this.prisma.user.findUnique({
      where: { email: getUserByEmailDto.email },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
  }

  createUser(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
  }
}
