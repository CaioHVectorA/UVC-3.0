/*
  Warnings:

  - A unique constraint covering the columns `[subhistMongoId]` on the table `read_laters` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "read_laters_subhistMongoId_key" ON "read_laters"("subhistMongoId");
