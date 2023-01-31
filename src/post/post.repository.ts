import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  getPostsByUserId() {
    return 'hi';
  }

  getFeed(userId: number) {
    return this.prisma.follow.findMany({
      where: { followerId: userId },
      select: {
        following: {
          select: {
            posts: true,
          },
        },
      },
    });
  }
}
