/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_parent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_parent" DROP CONSTRAINT "_parent_A_fkey";

-- DropForeignKey
ALTER TABLE "_parent" DROP CONSTRAINT "_parent_B_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_parent";

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_relation" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "child_id" INTEGER,

    CONSTRAINT "category_relation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "category_relation" ADD CONSTRAINT "category_relation_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_relation" ADD CONSTRAINT "category_relation_child_id_fkey" FOREIGN KEY ("child_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
