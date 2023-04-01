import { NewNotificationDto } from './dto';
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

  newFriendshipRequest(receiverId: number) {
    this.socket.emit(SocketEvent.NEW_FRIENDSHIP_REQUEST, receiverId);
  }
}
