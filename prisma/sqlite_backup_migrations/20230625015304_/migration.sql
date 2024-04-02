/*
  Warnings:

  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `histRef` on the `Like` table. All the data in the column will be lost.
  - Added the required column `histId` to the `Like` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "News";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Like" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "histId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Like_histId_fkey" FOREIGN KEY ("histId") REFERENCES "Hist" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("id", "userId") SELECT "id", "userId" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
