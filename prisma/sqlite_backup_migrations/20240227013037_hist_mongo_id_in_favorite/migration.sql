/*
  Warnings:

  - Added the required column `histMongoId` to the `favs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_favs" (
    "userId" TEXT NOT NULL,
    "histId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "histMongoId" TEXT NOT NULL,
    CONSTRAINT "favs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favs_histId_fkey" FOREIGN KEY ("histId") REFERENCES "hists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_favs" ("histId", "id", "userId") SELECT "histId", "id", "userId" FROM "favs";
DROP TABLE "favs";
ALTER TABLE "new_favs" RENAME TO "favs";
CREATE UNIQUE INDEX "favs_userId_key" ON "favs"("userId");
CREATE UNIQUE INDEX "favs_histId_key" ON "favs"("histId");
CREATE UNIQUE INDEX "favs_id_key" ON "favs"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
