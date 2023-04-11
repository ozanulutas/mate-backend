import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise } from '@prisma/client';
import snakeCase from 'lodash.snakecase';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto, UpdateLocationDto } from './dto';

@Injectable()
export class LocationRepository {
  constructor(private prisma: PrismaService) {}

  createLocation(
    userId: number,
    { name, isSelected, coordinates: [lon, lat] }: CreateLocationDto,
  ): PrismaPromise<void> {
    return this.prisma.$queryRaw`
      INSERT INTO location (
        user_id,
        name,
        coordinates,
        is_selected
      )
      VALUES (
        ${userId},
        ${name},
        ST_MakePoint(${lon}, ${lat}),
        ${isSelected}
      )
    `;
  }

  // https://github.com/prisma/prisma/discussions/3481
  updateLocation(
    userId: number,
    { id, ...updateLocationDto }: UpdateLocationDto,
  ): PrismaPromise<[{ id: number }]> {
    const fields = Object.keys(updateLocationDto)
      .map((key) => {
        const val = updateLocationDto[key];
        let fieldValue = '';

        if (key === 'coordinates') {
          fieldValue = `ST_MakePoint(${val[0]}, ${val[1]})`;
        } else if (typeof val === 'string') {
          fieldValue = `'${val}'`;
        } else {
          fieldValue = val;
        }

        return Prisma.raw(`${snakeCase(key)} = ${fieldValue}`).text;
      })
      .join(', ');

    return this.prisma.$queryRaw`
      UPDATE location
      SET
        ${Prisma.raw(fields)}
      WHERE
        id = ${id} AND user_id = ${userId}
      RETURNING id
    `;
  }

  setSelectedLocationToFalse(userId: number): PrismaPromise<void> {
    return this.prisma.$queryRaw`
      UPDATE location
      SET
        is_selected = false
      WHERE
        user_id = ${userId} AND is_selected = true
    `;
  }

  removeLocation(userId: number, id: number): PrismaPromise<void> {
    return this.prisma.$queryRaw`
      DELETE FROM location
      WHERE
        user_id = ${userId} AND id = ${id}
    `;
  }

  getLocationsByUserId(userId: number) {
    return this.prisma.$queryRaw<unknown[]>`
      SELECT
        id,
        name,
        CAST(ST_AsGeoJSON(coordinates) AS json) geojson,
        is_selected "isSelected"
      FROM
        location
      WHERE
        user_id = ${userId}
      ORDER BY created_at
    `;
  }
}
