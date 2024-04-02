/*
  Warnings:

  - You are about to drop the column `author_img` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `username_author` on the `comments` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "comment_by" TEXT NOT NULL,
    "comment_in" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "histId" TEXT,
    CONSTRAINT "comments_comment_by_fkey" FOREIGN KEY ("comment_by") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "comments_histId_fkey" FOREIGN KEY ("histId") REFERENCES "Hist" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_comments" ("comment_by", "comment_in", "content", "created_at", "histId", "id") SELECT "comment_by", "comment_in", "content", "created_at", "histId", "id" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
