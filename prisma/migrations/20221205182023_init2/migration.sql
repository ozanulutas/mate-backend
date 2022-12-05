/*
  Warnings:

  - You are about to drop the `Sex` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_sexId_fkey";

-- DropTable
DROP TABLE "Sex";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "sex" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sex_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "passport" TEXT NOT NULL,
    "info" TEXT,
    "lat_lon" TEXT,
    "birthday" TIMESTAMP(3),
    "city" TEXT,
    "country" TEXT,
    "sex_id" INTEGER,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_parent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_parent_AB_unique" ON "_parent"("A", "B");

-- CreateIndex
CREATE INDEX "_parent_B_index" ON "_parent"("B");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_sex_id_fkey" FOREIGN KEY ("sex_id") REFERENCES "sex"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_parent" ADD CONSTRAINT "_parent_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_parent" ADD CONSTRAINT "_parent_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
