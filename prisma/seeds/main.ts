import { PrismaClient } from '@prisma/client';
import { category } from './category';
import { categoryRelation } from './category-relation';
import { gender } from './gender';
import { user } from './user';

const prisma = new PrismaClient();

async function main() {
  try {
    await gender(prisma);
    await user(prisma);
    await category(prisma);
    await categoryRelation(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
