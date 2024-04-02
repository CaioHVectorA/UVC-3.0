/*
  Warnings:

  - You are about to drop the `CommentNUSer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CommentNUSer";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Comment_rent" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "commentId"),
    CONSTRAINT "Comment_rent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_rent_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "comment_by" TEXT NOT NULL,
    "comment_in" TEXT NOT NULL DEFAULT '',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_comments" ("comment_by", "content", "created_at", "id") SELECT "comment_by", "content", "created_at", "id" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
CREATE UNIQUE INDEX "comments_content_key" ON "comments"("content");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
