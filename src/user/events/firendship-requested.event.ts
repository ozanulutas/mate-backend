export class FriendshipRequestedEvent {
  senderId: number;
  receiverId: number;

  constructor({ senderId, receiverId }) {
    this.receiverId = receiverId;
    this.senderId = senderId;
  }
}
