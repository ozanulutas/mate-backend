import { PrismaClient } from '@prisma/client';
import { category } from './category';
import { categoryRelation } from './category-relation';
import { comment } from './comment';
import { follow } from './follow';
import { gender } from './gender';
import { location } from './location';
import { message } from './message';
import { messageReceiver } from './message-receiver';
import { post } from './post';
import { selectedLocation } from './selected-location';
import { user } from './user';
import { userCategory } from './user-category';

const prisma = new PrismaClient();

async function main() {
  try {
    await gender(prisma);
    await user(prisma);
    await location(prisma);
    await category(prisma);
    await post(prisma);
    await comment(prisma);
    await selectedLocation(prisma);
    await categoryRelation(prisma);
    await userCategory(prisma);
    await follow(prisma);
    await message(prisma);
    await messageReceiver(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
