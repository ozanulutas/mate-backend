import { PrismaClient } from '@prisma/client';
import { FriendshipStatus } from '../../src/user/user.constants';

export async function friendshipStatus(prisma: PrismaClient) {
  await prisma.friendshipStatus.deleteMany();
  await prisma.friendshipStatus.createMany({
    data: [
      { id: FriendshipStatus.REQUESTED, name: 'requested' },
      { id: FriendshipStatus.ACCEPTED, name: 'accepted' },
      { id: FriendshipStatus.BLOCKED, name: 'blocked' },
    ],
  });
}
