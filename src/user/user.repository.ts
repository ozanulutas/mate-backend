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
        JOIN selected_location sl ON sl.location_id = l.id
        JOIN user_category uc ON u.id = uc.user_id
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
