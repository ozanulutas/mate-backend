import { FriendshipStatus } from 'src/user/user.constants';
import {
  FriendshipRemovedDto,
  FriendshipStatusChangedDto,
  NewNotificationDto,
} from './dto';
import { SocketEvent } from './socket.constants';
import { Socket } from 'socket.io-client';

export class EventEmitter {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  newNotification(notifierId: number, newNotificationDto?: NewNotificationDto) {
    this.socket.emit(SocketEvent.NEW_NOTIFICATION, {
      notifierId,
      ...newNotificationDto,
    });
  }

  newFriendshipRequest(receiverId: number, senderId: number) {
    this.socket.emit(SocketEvent.NEW_FRIENDSHIP_REQUEST, {
      receiverId,
      senderId,
      friendshipStatusId: FriendshipStatus.REQUESTED,
    });
  }

  friendshipStatusChanged(
    friendshipStatusChangedDto: FriendshipStatusChangedDto,
  ) {
    this.socket.emit(
      SocketEvent.FRIENDSHIP_STATUS_CHANGED,
      friendshipStatusChangedDto,
    );
  }

  friendshipRemoved(friendshipRemovedDto: FriendshipRemovedDto) {
    this.socket.emit(SocketEvent.FRIENDSHIP_REMOVED, friendshipRemovedDto);
  }
}
