import { Injectable } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';
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

  getLocationsByUserId(userId: number) {
    return this.prisma
      .$queryRaw`SELECT id, name, CAST(ST_AsGeoJSON(coordinates) AS json) geojson FROM location WHERE user_id = ${userId}`;
  }
}
