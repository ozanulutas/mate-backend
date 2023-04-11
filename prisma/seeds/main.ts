import { PrismaClient } from '@prisma/client';
import { category } from './category';
import { categoryRelation } from './category-relation';
import { comment } from './comment';
import { follow } from './follow';
import { friend } from './friend';
import { friendshipStatus } from './friendship-status';
import { gender } from './gender';
import { location } from './location';
import { message } from './message';
import { messageReceiver } from './message-receiver';
import { notification } from './notification';
import { notificationType } from './notification-type';
import { notifier } from './notifier';
import { post } from './post';
import { user } from './user';
import { userCategory } from './user-category';

const prisma = new PrismaClient();

async function main() {
  try {
    await gender(prisma);
    await friendshipStatus(prisma);
    await notificationType(prisma);
    await user(prisma);
    await location(prisma);
    await category(prisma);
    await post(prisma);
    await comment(prisma);
    await categoryRelation(prisma);
    await userCategory(prisma);
    await follow(prisma);
    await friend(prisma);
    await message(prisma);
    await messageReceiver(prisma);
    await notification(prisma);
    await notifier(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
