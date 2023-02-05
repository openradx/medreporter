/*
  Warnings:

  - A unique constraint covering the columns `[filename]` on the table `Image` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Image_filename_key" ON "Image"("filename");
