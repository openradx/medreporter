/*
  Warnings:

  - The values [MODULE] on the enum `ResourceType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `reportFormat` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `structureData` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `template` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Resource` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourceCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourceTranslation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[type,authorId,slug]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `data` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `frame` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peferences` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `properties` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locale` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Resource` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Resource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ResourceType_new" AS ENUM ('FIGURE', 'TEMPLATE');
ALTER TABLE "Resource" ALTER COLUMN "type" TYPE "ResourceType_new" USING ("type"::text::"ResourceType_new");
ALTER TYPE "ResourceType" RENAME TO "ResourceType_old";
ALTER TYPE "ResourceType_new" RENAME TO "ResourceType";
DROP TYPE "ResourceType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ReportDetail" DROP CONSTRAINT "ReportDetail_reportId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceCategory" DROP CONSTRAINT "ResourceCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceCategory" DROP CONSTRAINT "ResourceCategory_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceTranslation" DROP CONSTRAINT "ResourceTranslation_resourceId_fkey";

-- DropIndex
DROP INDEX "Resource_type_authorId_name_key";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "reportFormat",
DROP COLUMN "structureData",
DROP COLUMN "template",
ADD COLUMN     "data" JSONB NOT NULL,
ADD COLUMN     "frame" JSONB NOT NULL,
ADD COLUMN     "peferences" JSONB NOT NULL,
ADD COLUMN     "properties" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "name",
DROP COLUMN "source",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "locale" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "CategoryTranslation";

-- DropTable
DROP TABLE "ReportDetail";

-- DropTable
DROP TABLE "ResourceCategory";

-- DropTable
DROP TABLE "ResourceTranslation";

-- CreateTable
CREATE TABLE "ResourceTag" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "ResourceTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResourceTag_resourceId_tagId_key" ON "ResourceTag"("resourceId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_label_key" ON "Tag"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Resource_type_authorId_slug_key" ON "Resource"("type", "authorId", "slug");

-- AddForeignKey
ALTER TABLE "ResourceTag" ADD CONSTRAINT "ResourceTag_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceTag" ADD CONSTRAINT "ResourceTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
