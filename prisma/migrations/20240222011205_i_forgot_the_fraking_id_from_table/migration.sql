/*
  Warnings:

  - The required column `id` was added to the `Fav` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `ReadLater` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fav" (
    "userId" TEXT NOT NULL,
    "histId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "Fav_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Fav_histId_fkey" FOREIGN KEY ("histId") REFERENCES "hists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fav" ("histId", "userId") SELECT "histId", "userId" FROM "Fav";
DROP TABLE "Fav";
ALTER TABLE "new_Fav" RENAME TO "Fav";
CREATE UNIQUE INDEX "Fav_userId_key" ON "Fav"("userId");
CREATE UNIQUE INDEX "Fav_histId_key" ON "Fav"("histId");
CREATE UNIQUE INDEX "Fav_id_key" ON "Fav"("id");
CREATE TABLE "new_ReadLater" (
    "userId" TEXT NOT NULL,
    "histId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "ReadLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReadLater_histId_fkey" FOREIGN KEY ("histId") REFERENCES "hists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ReadLater" ("histId", "userId") SELECT "histId", "userId" FROM "ReadLater";
DROP TABLE "ReadLater";
ALTER TABLE "new_ReadLater" RENAME TO "ReadLater";
CREATE UNIQUE INDEX "ReadLater_userId_key" ON "ReadLater"("userId");
CREATE UNIQUE INDEX "ReadLater_histId_key" ON "ReadLater"("histId");
CREATE UNIQUE INDEX "ReadLater_id_key" ON "ReadLater"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
