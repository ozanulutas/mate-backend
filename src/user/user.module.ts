import { Module } from '@nestjs/common';
import { LocationModule } from 'src/location/location.module';
import { MessageModule } from 'src/message/message.module';
import { NotificationModule } from 'src/notification/notification.module';
import { PostModule } from 'src/post/post.module';
import { FriendshipRespondedListener } from './listeners/firendship-responded.listener';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { SocketModule } from 'src/socket/socket.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    LocationModule,
    PostModule,
    MessageModule,
    NotificationModule,
    SocketModule,
    CategoryModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, FriendshipRespondedListener],
  exports: [UserService],
})
export class UserModule {}
