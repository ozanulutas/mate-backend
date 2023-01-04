import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { SexModule } from './sex/sex.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, SexModule],
})
export class AppModule {}
