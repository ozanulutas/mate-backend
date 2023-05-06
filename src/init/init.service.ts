import { Injectable } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InitService {
  constructor(
    private userService: UserService,
    private messageService: MessageService,
  ) {}

  async init(userId: number) {
    const [userConfig, unreadChatInfo] = await Promise.all([
      this.userService.getUserConfig(userId),
      this.messageService.getUnreadChatInfo(userId),
    ]);
    const {
      _count: { receivedNotifications, friends },
      location,
      ...user
    } = userConfig;

    return {
      user,
      unviewedNotificationCount: receivedNotifications,
      friendshipRequestCount: friends,
      unreadChatInfo,
      selectedLocation: location[0],
    };
  }
}
