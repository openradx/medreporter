/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImageTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "ImageCategory" DROP CONSTRAINT "ImageCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ImageCategory" DROP CONSTRAINT "ImageCategory_imageId_fkey";

-- DropForeignKey
ALTER TABLE "ImageTranslation" DROP CONSTRAINT "ImageTranslation_imageId_fkey";

-- DropTable
DROP TABLE "Image";

-- DropTable
DROP TABLE "ImageCategory";

-- DropTable
DROP TABLE "ImageTranslation";

-- CreateTable
CREATE TABLE "Figure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "original" TEXT NOT NULL,
    "processed" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "releaseStatus" "ReleaseStatus" NOT NULL,
    "authorId" TEXT NOT NULL,
    "instituteId" TEXT,

    CONSTRAINT "Figure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FigureTranslation" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "figureId" TEXT NOT NULL,

    CONSTRAINT "FigureTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FigureCategory" (
    "id" TEXT NOT NULL,
    "figureId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "FigureCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Figure_authorId_name_key" ON "Figure"("authorId", "name");

-- CreateIndex
CREATE INDEX "FigureTranslation_figureId_default_idx" ON "FigureTranslation"("figureId", "default");

-- CreateIndex
CREATE UNIQUE INDEX "FigureTranslation_language_figureId_key" ON "FigureTranslation"("language", "figureId");

-- CreateIndex
CREATE UNIQUE INDEX "FigureCategory_figureId_categoryId_key" ON "FigureCategory"("figureId", "categoryId");

-- AddForeignKey
ALTER TABLE "Figure" ADD CONSTRAINT "Figure_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Figure" ADD CONSTRAINT "Figure_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigureTranslation" ADD CONSTRAINT "FigureTranslation_figureId_fkey" FOREIGN KEY ("figureId") REFERENCES "Figure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigureCategory" ADD CONSTRAINT "FigureCategory_figureId_fkey" FOREIGN KEY ("figureId") REFERENCES "Figure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FigureCategory" ADD CONSTRAINT "FigureCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
