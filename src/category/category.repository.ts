import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  getCategoriesByName(categoryName: string) {
    return this.prisma.category.findMany({
      where: {
        name: {
          contains: categoryName,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  getFilteredCategoriesByName(categoryName: string, userId: number) {
    return this.prisma.$queryRaw`
      SELECT
        *
      FROM
        category c
      JOIN
        user_category uc ON uc.category_id = c.id
      WHERE uc.user_id != ${userId} AND LOWER("name") LIKE LOWER('%${categoryName}%')
    `;
    // return this.prisma.category.findMany({
    //   where: {
    //     name: {
    //       contains: categoryName,
    //       mode: 'insensitive',
    //     },
    //     NOT: {
    //       user: {
    //         some: {
    //           id: userId,
    //         },
    //       },
    //     },
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //   },
    // });
  }

  getCategoriesByUserId(userId: number) {
    return this.prisma.userCategory.findMany({
      where: {
        userId,
      },
      select: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
