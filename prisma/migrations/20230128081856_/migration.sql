-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_follower_id_fkey";

-- DropForeignKey
ALTER TABLE "follow" DROP CONSTRAINT "follow_following_id_fkey";

-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_category" DROP CONSTRAINT "user_category_user_id_fkey";

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_category" ADD CONSTRAINT "user_category_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
