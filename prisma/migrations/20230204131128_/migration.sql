/*
  Warnings:

  - You are about to drop the column `isRead` on the `message_receiver` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "message_receiver" DROP COLUMN "isRead",
ADD COLUMN     "is_read" BOOLEAN NOT NULL DEFAULT false;
