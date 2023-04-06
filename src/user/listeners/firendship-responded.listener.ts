import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationType } from 'src/notification/notification.constants';
import { NotificationService } from 'src/notification/notification.service';
import { FriendshipRespondedEvent } from '../events';
import { Event, FriendshipStatus } from '../user.constants';
import { SocketClientProvider } from 'src/socket/socket-client.provider';

// @TODO: handle remove frindship by user case
@Injectable()
export class FriendshipRespondedListener {
  constructor(
    private notificationService: NotificationService,
    private socketClient: SocketClientProvider,
  ) {}

  @OnEvent(Event.FRIENDSHIP_RESPONDED)
  async handleFriendshipRespondedEvent(event: FriendshipRespondedEvent) {
    const { receiverId, senderId } = event;

    await this.notificationService.createNotification({
      actorId: receiverId,
      entityId: senderId,
      notificationTypeId: NotificationType.FRIENDSHIP_ACCEPTED,
      notifierIds: [senderId],
    });

    this.socketClient.eventEmitter.friendshipStatusChanged({
      receiverId,
      senderId,
      friendshipStatusId: FriendshipStatus.ACCEPTED,
    });
  }
}
