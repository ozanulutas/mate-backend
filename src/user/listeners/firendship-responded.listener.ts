import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NotificationType } from 'src/notification/notification.constants';
import { NotificationService } from 'src/notification/notification.service';
import { FriendshipRespondedEvent } from '../events';
import { Event, FriendshipStatus } from '../user.constants';

// @TODO: handle remove frindship by user case
@Injectable()
export class FriendshipRespondedListener {
  constructor(private notificationService: NotificationService) {}

  @OnEvent(Event.FRIENDSHIP_RESPONDED)
  async handleFriendshipRespondedEvent(event: FriendshipRespondedEvent) {
    const { receiverId, senderId, friendshipStatusId } = event;
    const promiseArr: Promise<unknown>[] = [];

    if (friendshipStatusId === FriendshipStatus.ACCEPTED) {
      promiseArr.push(
        this.notificationService.createNotification({
          actorId: senderId,
          entityId: receiverId,
          notificationTypeId: NotificationType.FRIENDSHIP_ACCEPTED,
          notifierIds: [receiverId],
        }),
      );
    }

    promiseArr.push(
      this.notificationService.removeNotification({
        actorId: receiverId,
        entityId: senderId,
        notificationTypeId: NotificationType.FRIENDSHIP_REQUESTED,
      }),
    );

    await Promise.all(promiseArr);
  }
}
