/*
  Warnings:

  - You are about to drop the `comment_rent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "comment_rent";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "comment_by" TEXT NOT NULL,
    "comment_in" TEXT NOT NULL,
    "userId" TEXT NOT NULL DEFAULT 'default_user_id',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comments" ("comment_by", "comment_in", "content", "created_at", "id") SELECT "comment_by", "comment_in", "content", "created_at", "id" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
CREATE UNIQUE INDEX "comments_content_key" ON "comments"("content");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
