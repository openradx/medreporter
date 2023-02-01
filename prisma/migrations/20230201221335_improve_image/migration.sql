/*
  Warnings:

  - You are about to drop the column `source` on the `Image` table. All the data in the column will be lost.
  - Added the required column `original` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processed` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "source",
ADD COLUMN     "filename" TEXT,
ADD COLUMN     "original" TEXT NOT NULL,
ADD COLUMN     "processed" TEXT NOT NULL;
