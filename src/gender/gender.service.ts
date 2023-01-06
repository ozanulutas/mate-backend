import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenderService {
  constructor(private prisma: PrismaService) {}

  getGenders() {
    return this.prisma.gender.findMany();
  }
}
