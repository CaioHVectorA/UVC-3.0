-- CreateTable
CREATE TABLE "Fav" (
    "userId" TEXT NOT NULL,
    "histId" TEXT NOT NULL,
    CONSTRAINT "Fav_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Fav_histId_fkey" FOREIGN KEY ("histId") REFERENCES "hists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ReadLater" (
    "userId" TEXT NOT NULL,
    "histId" TEXT NOT NULL,
    CONSTRAINT "ReadLater_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ReadLater_histId_fkey" FOREIGN KEY ("histId") REFERENCES "hists" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Fav_userId_key" ON "Fav"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Fav_histId_key" ON "Fav"("histId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadLater_userId_key" ON "ReadLater"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ReadLater_histId_key" ON "ReadLater"("histId");
