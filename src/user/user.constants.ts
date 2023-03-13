export enum FriendshipStatus {
  REQUESTED = 1,
  ACCEPTED,
  BLOCKED,
}

export const Event = {
  FRIENDSHIP_REQUESTED: 'friendship.requested',
  FRIENDSHIP_RESPONDED: 'friendship.responded',
};
