/*
  Warnings:

  - You are about to drop the column `histId` on the `ReadLater` table. All the data in the column will be lost.
  - Added the required column `subhistMongoId` to the `ReadLater` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hists" ADD COLUMN "readLaterId" TEXT;

-- CreateTable
CREATE TABLE "HistRead" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "subhistMongoId" TEXT NOT NULL,
    CONSTRAINT "HistRead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ReadLater" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "subhistMongoId" TEXT NOT NULL,
    CONSTRAINT "ReadLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReadLater" ("id", "userId") SELECT "id", "userId" FROM "ReadLater";
DROP TABLE "ReadLater";
ALTER TABLE "new_ReadLater" RENAME TO "ReadLater";
CREATE UNIQUE INDEX "ReadLater_userId_key" ON "ReadLater"("userId");
CREATE UNIQUE INDEX "ReadLater_id_key" ON "ReadLater"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "HistRead_userId_key" ON "HistRead"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HistRead_id_key" ON "HistRead"("id");
