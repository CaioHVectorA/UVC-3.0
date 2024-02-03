-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Like" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "histId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Like_histId_fkey" FOREIGN KEY ("histId") REFERENCES "Hist" ("ref") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Like" ("histId", "id", "userId") SELECT "histId", "id", "userId" FROM "Like";
DROP TABLE "Like";
ALTER TABLE "new_Like" RENAME TO "Like";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
