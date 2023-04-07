import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FriendshipStatus } from 'src/user/user.constants';
import { CreatePostDto } from './dto';

@Injectable()
export class PostRepository {
  constructor(private prisma: PrismaService) {}

  createPost(createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: createPostDto,
      select: { id: true },
    });
  }

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
          OR: [
            {
              followers: {
                some: {
                  followerId: userId,
                },
              },
            },
            {
              OR: [
                {
                  friends: {
                    some: {
                      friendshipStatusId: FriendshipStatus.ACCEPTED,
                      senderId: userId,
                    },
                  },
                },
                {
                  symmetricFriends: {
                    some: {
                      friendshipStatusId: FriendshipStatus.ACCEPTED,
                      receiverId: userId,
                    },
                  },
                },
              ],
            },
          ],
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
            // followers: {
            //   select: {
            //     follower: {
            //       select: {
            //         id: true,
            //       },
            //     },
            //   },
            //   where: {
            //     followerId: userId, // @TODO: convert to boolean
            //   },
            // },
          },
        },
      },
    });
  }
}
