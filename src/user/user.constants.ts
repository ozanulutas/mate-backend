export enum FriendshipStatus {
  REQUESTED = 1,
  ACCEPTED,
  BLOCKED,
}

export enum FriendshipRemoveAction {
  REMOVE = 1,
  REJET,
  CANCEL,
}

export const Event = {
  FRIENDSHIP_REQUESTED: 'friendship.requested',
  FRIENDSHIP_RESPONDED: 'friendship.responded',
};
