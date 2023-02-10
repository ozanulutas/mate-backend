import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  getPostsByUserId(userId: number) {
    return this.prisma.post.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }

  getFeed(userId: number) {
    return this.prisma.post.findMany({
      where: {
        user: {
          followers: {
            some: {
              followerId: userId,
            },
          },
        },
      },
      select: {
        id: true,
        text: true,
        createdAt: true,
        _count: {
          select: {
            comments: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }
}
