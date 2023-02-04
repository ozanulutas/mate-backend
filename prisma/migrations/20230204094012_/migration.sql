-- DropForeignKey
ALTER TABLE "message_receiver" DROP CONSTRAINT "message_receiver_receiver_id_fkey";

-- AddForeignKey
ALTER TABLE "message_receiver" ADD CONSTRAINT "message_receiver_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
