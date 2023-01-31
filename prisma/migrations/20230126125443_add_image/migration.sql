-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "releaseStatus" "ReleaseStatus" NOT NULL,
    "authorId" TEXT NOT NULL,
    "instituteId" TEXT,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageTranslation" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,

    CONSTRAINT "ImageTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageCategory" (
    "id" TEXT NOT NULL,
    "imageId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ImageCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ImageTranslation_imageId_default_idx" ON "ImageTranslation"("imageId", "default");

-- CreateIndex
CREATE UNIQUE INDEX "ImageTranslation_language_imageId_key" ON "ImageTranslation"("language", "imageId");

-- CreateIndex
CREATE UNIQUE INDEX "ImageCategory_imageId_categoryId_key" ON "ImageCategory"("imageId", "categoryId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageTranslation" ADD CONSTRAINT "ImageTranslation_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageCategory" ADD CONSTRAINT "ImageCategory_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageCategory" ADD CONSTRAINT "ImageCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
