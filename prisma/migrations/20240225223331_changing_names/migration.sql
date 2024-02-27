/*
  Warnings:

  - You are about to drop the `Fav` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistRead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReadLater` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Fav";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "HistRead";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ReadLater";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "favs" (
    "userId" TEXT NOT NULL,
    "histId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    CONSTRAINT "favs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "favs_histId_fkey" FOREIGN KEY ("histId") REFERENCES "hists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "hist_reads" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "subhistMongoId" TEXT NOT NULL,
    CONSTRAINT "hist_reads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "read_laters" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY,
    "subhistMongoId" TEXT NOT NULL,
    CONSTRAINT "read_laters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "favs_userId_key" ON "favs"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "favs_histId_key" ON "favs"("histId");

-- CreateIndex
CREATE UNIQUE INDEX "favs_id_key" ON "favs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "hist_reads_userId_key" ON "hist_reads"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "hist_reads_id_key" ON "hist_reads"("id");

-- CreateIndex
CREATE UNIQUE INDEX "read_laters_userId_key" ON "read_laters"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "read_laters_id_key" ON "read_laters"("id");
