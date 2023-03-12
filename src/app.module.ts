import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { PrismaModule } from './prisma/prisma.module';
import { GenderModule } from './gender/gender.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { LocationModule } from './location/location.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { MessageModule } from './message/message.module';
import { InitModule } from './init/init.module';
import { NotificationModule } from './notification/notification.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    GenderModule,
    UserModule,
    AuthModule,
    CategoryModule,
    LocationModule,
    PostModule,
    CommentModule,
    MessageModule,
    InitModule,
    NotificationModule,
    SocketModule,
  ],
})
export class AppModule {}
