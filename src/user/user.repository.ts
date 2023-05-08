import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AcceptFriendshipDto,
  CreateUserDto,
  DeleteFriendshipDto,
  FollowDto,
  RequestFriendshipDto,
  SearchDto,
  UnfollowDto,
  UpdateUserDto,
} from './dto';
import { FriendshipStatus } from './user.constants';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  getUsers() {
    return this.prisma.user.findMany();
  }

  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
      },
    });
  }

  getUserBy(where: Partial<Pick<User, 'id' | 'email'>>) {
    return this.prisma.user.findUnique({
      where,
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
      },
    });
  }

  getUserById(id: number, requesterId: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        birthday: true,
        info: true,
        _count: {
          select: {
            followers: true,
            followings: true,
          },
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        followers: {
          where: {
            followerId: requesterId,
          },
          select: {
            followerId: true,
          },
        },
        friends: {
          where: {
            senderId: requesterId,
          },
          select: {
            friendshipStatusId: true,
            receiverId: true,
            senderId: true,
          },
        },
        symmetricFriends: {
          where: {
            receiverId: requesterId,
          },
          select: {
            friendshipStatusId: true,
            receiverId: true,
            senderId: true,
          },
        },
      },
    });
  }

  updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: updateUserDto,
      select: {
        id: true,
      },
    });
  }

  getUserFollowers(userId: number) {
    return this.prisma.follow.findMany({
      where: {
        followingId: userId,
      },
      select: {
        follower: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  getUserFollowings(userId: number) {
    return this.prisma.follow.findMany({
      where: {
        followerId: userId,
      },
      select: {
        following: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  getUserConfig(userId: number) {
    return this.prisma.user.findFirst({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        genderId: true,
        birthday: true,
        gsm: true,
        countryCode: true,
        location: {
          where: {
            isSelected: true,
          },
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            receivedNotifications: {
              where: {
                isViewed: false,
              },
            },
            friends: {
              where: {
                friendshipStatusId: FriendshipStatus.REQUESTED,
                receiverId: userId,
              },
            },
          },
        },
      },
    });
  }

  search({ lon, lat, categories, distance }: SearchDto) {
    return this.prisma.$queryRaw`
      SELECT 
        u.id id,
        u.username,
        CAST(ST_AsGeoJSON(l.coordinates) AS json) geojson,
        ARRAY(
          SELECT JSON_BUILD_OBJECT('id', c.id, 'name', c.name) 
          FROM user_category uc, category c 
          WHERE u.id = uc.user_id AND uc.category_id = c.id
        ) categories
      FROM
        "user" u JOIN location l ON l.user_id = u.id
        --JOIN selected_location sl ON sl.location_id = l.id
        JOIN user_category uc ON u.id = uc.user_id
      WHERE
        ST_DWithin((l.coordinates)::geography, ST_MakePoint(${lon}, ${lat}), ${distance}) 
        AND uc.category_id IN (${Prisma.join(categories)})
        AND l.is_selected = true
      GROUP BY u.id, l.name, l.coordinates
      ORDER BY
        ST_Distance((l.coordinates)::geography, ST_MakePoint(${lon}, ${lat})),
        count(uc.category_id) DESC;
    `;
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

  follow(followDto: FollowDto) {
    return this.prisma.follow.create({
      data: followDto,
      select: {
        id: true,
      },
    });
  }

  unfollow({ followerId, followingId }: UnfollowDto) {
    return this.prisma.follow.delete({
      where: { followerId_followingId: { followerId, followingId } },
      select: {
        id: true,
      },
    });
  }

  getFriendshipRequests(receiverId: number) {
    return this.prisma.friend.findMany({
      where: {
        receiverId,
        friendshipStatusId: FriendshipStatus.REQUESTED,
      },
      select: {
        id: true,
        createdAt: true,
        sender: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  getFriends(userId: number, name = '') {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        friends: {
          where: {
            sender: {
              username: {
                contains: name,
              },
            },
            friendshipStatusId: FriendshipStatus.ACCEPTED,
          },
          select: {
            sender: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        symmetricFriends: {
          where: {
            receiver: {
              username: {
                contains: name,
              },
            },
            friendshipStatusId: FriendshipStatus.ACCEPTED,
          },
          select: {
            receiver: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    });
  }

  getFriendshipRequest(senderId: number, receiverId: number) {
    return this.prisma.friend.findMany({
      where: {
        OR: [
          { receiverId, senderId },
          { receiverId: senderId, senderId: receiverId },
        ],
        friendshipStatusId: FriendshipStatus.REQUESTED,
      },
      select: {
        id: true,
        receiverId: true,
        senderId: true,
      },
    });
  }

  requestFriendship({ senderId, receiverId }: RequestFriendshipDto) {
    return this.prisma.friend.create({
      data: {
        senderId,
        receiverId,
        friendshipStatusId: FriendshipStatus.REQUESTED,
      },
      select: {
        id: true,
        senderId: true,
        receiverId: true,
        friendshipStatusId: true,
      },
    });
  }

  acceptFriendship({ senderId, receiverId }: AcceptFriendshipDto) {
    return this.prisma.friend.updateMany({
      where: {
        receiverId,
        senderId,
      },
      data: {
        friendshipStatusId: FriendshipStatus.ACCEPTED,
      },
    });
  }

  deleteFriendship({ senderId, receiverId }: DeleteFriendshipDto) {
    return this.prisma.friend.deleteMany({
      where: {
        OR: [
          { receiverId, senderId },
          { receiverId: senderId, senderId: receiverId },
        ],
      },
    });
  }
}
