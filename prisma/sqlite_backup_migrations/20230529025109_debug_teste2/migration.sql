/*
  Warnings:

  - You are about to drop the column `created_by` on the `comments` table. All the data in the column will be lost.
  - Added the required column `comment_by` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "comment_by" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_comments" ("content", "created_at", "id") SELECT "content", "created_at", "id" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
CREATE UNIQUE INDEX "comments_content_key" ON "comments"("content");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
