/*
  Warnings:

  - A unique constraint covering the columns `[receiver_id,sender_id]` on the table `friend` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "friend_receiver_id_sender_id_key" ON "friend"("receiver_id", "sender_id");
