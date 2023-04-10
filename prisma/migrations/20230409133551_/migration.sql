/*
  Warnings:

  - You are about to drop the `selected_location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "selected_location" DROP CONSTRAINT "selected_location_location_id_fkey";

-- DropForeignKey
ALTER TABLE "selected_location" DROP CONSTRAINT "selected_location_user_id_fkey";

-- DropTable
DROP TABLE "selected_location";
