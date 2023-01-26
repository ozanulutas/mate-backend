import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from './dto';

@Injectable()
export class LocationRepository {
  constructor(private prisma: PrismaService) {}

  createLocation(userId: number, createLocationDto: CreateLocationDto) {
    return this.prisma.location.create({
      data: { userId, ...createLocationDto },
      select: {
        id: true,
      },
    });
  }

  getLocations(userId: number) {
    return this.prisma.location.findMany({
      where: {
        userId,
      },
    });
  }
}
