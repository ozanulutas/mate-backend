import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationType } from 'src/notification/notification.constants';
import { NotificationService } from 'src/notification/notification.service';
import { FriendshipRequestedEvent } from '../events';
import { Event } from '../user.constants';

@Injectable()
export class FriendshipRequestedListener {
  constructor(private notificationService: NotificationService) {}

  @OnEvent(Event.FRIENDSHIP_REQUESTED)
  async handleFriendshipRequestedEvent(event: FriendshipRequestedEvent) {
    const { receiverId, senderId } = event;

    await this.notificationService.createNotification({
      actorId: senderId,
      entityId: receiverId,
      notificationTypeId: NotificationType.FRIENDSHIP_REQUESTED,
      notifierIds: [receiverId],
    });
  }
}
