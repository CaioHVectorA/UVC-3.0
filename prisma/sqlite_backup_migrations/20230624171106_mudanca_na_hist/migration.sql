-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Hist" (
    "ref" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_view" DATETIME NOT NULL,
    "views" INTEGER NOT NULL,
    "likesNum" INTEGER NOT NULL
);
INSERT INTO "new_Hist" ("created_at", "id", "last_view", "likesNum", "ref", "views") SELECT "created_at", "id", "last_view", "likesNum", "ref", "views" FROM "Hist";
DROP TABLE "Hist";
ALTER TABLE "new_Hist" RENAME TO "Hist";
CREATE UNIQUE INDEX "Hist_ref_key" ON "Hist"("ref");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
