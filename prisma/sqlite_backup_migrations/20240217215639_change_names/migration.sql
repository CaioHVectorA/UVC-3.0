/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `News` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Admin_userId_key";

-- DropIndex
DROP INDEX "Hist_ref_key";

-- DropIndex
DROP INDEX "News_title_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Admin";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Hist";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Like";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "News";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "hists" (
    "ref" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_view" DATETIME NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likesNum" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "likes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "histId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "likes_histId_fkey" FOREIGN KEY ("histId") REFERENCES "hists" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "news" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "external_link" TEXT,
    "image" TEXT NOT NULL,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "admins" (
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

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
    CONSTRAINT "comments_histId_fkey" FOREIGN KEY ("histId") REFERENCES "hists" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_comments" ("comment_by", "comment_in", "content", "created_at", "histId", "id") SELECT "comment_by", "comment_in", "content", "created_at", "histId", "id" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "hists_ref_key" ON "hists"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "news_title_key" ON "news"("title");

-- CreateIndex
CREATE UNIQUE INDEX "admins_userId_key" ON "admins"("userId");
