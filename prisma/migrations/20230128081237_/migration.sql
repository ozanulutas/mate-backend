-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_user_id_fkey";

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
