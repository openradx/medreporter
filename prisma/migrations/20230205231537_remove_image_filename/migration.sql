/*
  Warnings:

  - You are about to drop the column `filename` on the `Image` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Image_filename_key";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "filename";
