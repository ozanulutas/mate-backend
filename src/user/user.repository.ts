import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, SearchDto } from './dto';

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

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        username: true,
        userCategory: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        following: {
          select: {
            following: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
        followedBy: {
          select: {
            follower: {
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

  search({ lon, lat, categories, distance }: SearchDto) {
    return this.prisma.$queryRaw`
      SELECT 
        u.id userId, u.username, CAST(ST_ASGEOJSON(l.coordinates) AS json) geojson, ARRAY_AGG(c.name) categories
      FROM
        location l JOIN "user" u ON l.user_id = u.id
        JOIN selected_location sl ON sl.location_id = l.id
        JOIN user_category uc ON u.id = uc.user_id
        JOIN category c ON c.id = uc.category_id
      WHERE
        ST_DWithin((l.coordinates)::geography, ST_MakePoint(${lon}, ${lat}), ${distance}) 
        AND uc.category_id IN (${Prisma.join(categories)})
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
}
