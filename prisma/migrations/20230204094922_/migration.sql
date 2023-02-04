-- AddForeignKey
ALTER TABLE "message_receiver" ADD CONSTRAINT "message_receiver_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
