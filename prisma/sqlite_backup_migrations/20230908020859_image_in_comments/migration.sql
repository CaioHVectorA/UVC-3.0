/*
  Warnings:

  - Added the required column `author_img` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "comment_by" TEXT NOT NULL,
    "comment_in" TEXT NOT NULL,
    "username_author" TEXT NOT NULL,
    "author_img" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "comments_comment_by_fkey" FOREIGN KEY ("comment_by") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "new_comments" ("comment_by", "comment_in", "content", "created_at", "id", "username_author") SELECT "comment_by", "comment_in", "content", "created_at", "id", "username_author" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
