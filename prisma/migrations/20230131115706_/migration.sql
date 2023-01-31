-- DropForeignKey
ALTER TABLE "selected_location" DROP CONSTRAINT "selected_location_location_id_fkey";

-- AlterTable
ALTER TABLE "location" ADD COLUMN     "info" TEXT;

-- AddForeignKey
ALTER TABLE "selected_location" ADD CONSTRAINT "selected_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
