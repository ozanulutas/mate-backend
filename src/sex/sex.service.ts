import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SexService {
  constructor(private prisma: PrismaService) {}

  getSexes() {
    return this.prisma.sex.findMany();
  }
}
