-- DropForeignKey
ALTER TABLE "category_relation" DROP CONSTRAINT "category_relation_category_id_fkey";

-- DropForeignKey
ALTER TABLE "category_relation" DROP CONSTRAINT "category_relation_child_category_id_fkey";

-- AddForeignKey
ALTER TABLE "category_relation" ADD CONSTRAINT "category_relation_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_relation" ADD CONSTRAINT "category_relation_child_category_id_fkey" FOREIGN KEY ("child_category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
