import { Module } from '@nestjs/common';
import { LocationModule } from 'src/location/location.module';
import { MessageModule } from 'src/message/message.module';
import { NotificationModule } from 'src/notification/notification.module';
import { PostModule } from 'src/post/post.module';
import { FriendshipRequestedListener } from './listeners/firendship-requested.listener';
import { FriendshipRespondedListener } from './listeners/firendship-responded.listener';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [LocationModule, PostModule, MessageModule, NotificationModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    FriendshipRequestedListener,
    FriendshipRespondedListener,
  ],
  exports: [UserService],
})
export class UserModule {}
