-- CreateTable
CREATE TABLE "selected_location" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "selected_location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "selected_location_user_id_key" ON "selected_location"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "selected_location_location_id_key" ON "selected_location"("location_id");

-- AddForeignKey
ALTER TABLE "selected_location" ADD CONSTRAINT "selected_location_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "selected_location" ADD CONSTRAINT "selected_location_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
