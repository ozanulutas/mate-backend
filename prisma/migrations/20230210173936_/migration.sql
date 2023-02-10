-- DropForeignKey
ALTER TABLE "friend" DROP CONSTRAINT "friend_friend_status_id_fkey";

-- AddForeignKey
ALTER TABLE "friend" ADD CONSTRAINT "friend_friend_status_id_fkey" FOREIGN KEY ("friend_status_id") REFERENCES "friendship_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;
