import { FriendshipStatus } from '../user.constants';

export class FriendshipRespondedEvent {
  senderId: number;
  receiverId: number;
  friendshipStatusId: FriendshipStatus;

  constructor({
    senderId,
    receiverId,
    friendshipStatusId = FriendshipStatus.REQUESTED,
  }) {
    this.receiverId = receiverId;
    this.senderId = senderId;
    this.friendshipStatusId = friendshipStatusId;
  }
}
