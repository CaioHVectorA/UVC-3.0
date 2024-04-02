-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image_path" TEXT NOT NULL DEFAULT 'assets/user_images/sample.png',
    "last_seen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "comment_by" TEXT NOT NULL,
    "comment_in" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "histId" TEXT,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hists" (
    "ref" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_view" TIMESTAMP(3) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "likesNum" INTEGER NOT NULL DEFAULT 0,
    "readLaterId" TEXT,

    CONSTRAINT "hists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "histId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "external_link" TEXT,
    "image" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favs" (
    "userId" TEXT NOT NULL,
    "histId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "histMongoId" TEXT NOT NULL,

    CONSTRAINT "favs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hist_reads" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "subhistMongoId" TEXT NOT NULL,

    CONSTRAINT "hist_reads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "read_laters" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "subhistMongoId" TEXT NOT NULL,

    CONSTRAINT "read_laters_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "hists_ref_key" ON "hists"("ref");

-- CreateIndex
CREATE UNIQUE INDEX "news_title_key" ON "news"("title");

-- CreateIndex
CREATE UNIQUE INDEX "admins_userId_key" ON "admins"("userId");

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

-- CreateIndex
CREATE UNIQUE INDEX "read_laters_subhistMongoId_key" ON "read_laters"("subhistMongoId");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_comment_by_fkey" FOREIGN KEY ("comment_by") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_comment_in_fkey" FOREIGN KEY ("comment_in") REFERENCES "hists"("ref") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_histId_fkey" FOREIGN KEY ("histId") REFERENCES "hists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favs" ADD CONSTRAINT "favs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favs" ADD CONSTRAINT "favs_histId_fkey" FOREIGN KEY ("histId") REFERENCES "hists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hist_reads" ADD CONSTRAINT "hist_reads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "read_laters" ADD CONSTRAINT "read_laters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
