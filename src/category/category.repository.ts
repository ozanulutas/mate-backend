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
}
