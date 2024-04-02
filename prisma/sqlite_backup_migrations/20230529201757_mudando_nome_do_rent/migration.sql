/*
  Warnings:

  - You are about to drop the `Comment_rent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Comment_rent";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "comment_rent" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "commentId"),
    CONSTRAINT "comment_rent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comment_rent_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
