import { Injectable } from '@nestjs/common';
import { Location, PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from './dto';

@Injectable()
export class LocationRepository {
  constructor(private prisma: PrismaService) {}

  createLocation(
    userId: number,
    { name, coordinates: [lon, lat] }: CreateLocationDto,
  ): PrismaPromise<void> {
    return this.prisma
      .$queryRaw`INSERT INTO location (user_id, name, coordinates) VALUES(${userId}, ${name}, ST_MakePoint(${lon}, ${lat}))`;
  }

  getLocations(userId: number): PrismaPromise<Location> {
    return this.prisma
      .$queryRaw`SELECT id, name, ST_AsText(coordinates) FROM location WHERE user_id = ${userId}`;
  }
}
