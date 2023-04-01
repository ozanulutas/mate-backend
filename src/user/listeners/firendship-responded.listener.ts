import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationType } from 'src/notification/notification.constants';
import { NotificationService } from 'src/notification/notification.service';
import { FriendshipRespondedEvent } from '../events';
import { Event } from '../user.constants';

// @TODO: handle remove frindship by user case
@Injectable()
export class FriendshipRespondedListener {
  constructor(private notificationService: NotificationService) {}

  @OnEvent(Event.FRIENDSHIP_RESPONDED)
  async handleFriendshipRespondedEvent(event: FriendshipRespondedEvent) {
    const { receiverId, senderId } = event;

    await this.notificationService.createNotification({
      actorId: senderId,
      entityId: receiverId,
      notificationTypeId: NotificationType.FRIENDSHIP_ACCEPTED,
      notifierIds: [receiverId],
    });
  }
}
