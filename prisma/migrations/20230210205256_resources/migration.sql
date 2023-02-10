/*
  Warnings:

  - You are about to drop the `Figure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FigureCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FigureTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Module` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModuleCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModuleTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Template` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplateCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplateTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('FIGURE', 'MODULE', 'TEMPLATE');

-- DropForeignKey
ALTER TABLE "Figure" DROP CONSTRAINT "Figure_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Figure" DROP CONSTRAINT "Figure_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "FigureCategory" DROP CONSTRAINT "FigureCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "FigureCategory" DROP CONSTRAINT "FigureCategory_figureId_fkey";

-- DropForeignKey
ALTER TABLE "FigureTranslation" DROP CONSTRAINT "FigureTranslation_figureId_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleCategory" DROP CONSTRAINT "ModuleCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleCategory" DROP CONSTRAINT "ModuleCategory_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "ModuleTranslation" DROP CONSTRAINT "ModuleTranslation_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Template" DROP CONSTRAINT "Template_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateCategory" DROP CONSTRAINT "TemplateCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateCategory" DROP CONSTRAINT "TemplateCategory_templateId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateTranslation" DROP CONSTRAINT "TemplateTranslation_templateId_fkey";

-- DropTable
DROP TABLE "Figure";

-- DropTable
DROP TABLE "FigureCategory";

-- DropTable
DROP TABLE "FigureTranslation";

-- DropTable
DROP TABLE "Module";

-- DropTable
DROP TABLE "ModuleCategory";

-- DropTable
DROP TABLE "ModuleTranslation";

-- DropTable
DROP TABLE "Template";

-- DropTable
DROP TABLE "TemplateCategory";

-- DropTable
DROP TABLE "TemplateTranslation";

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "type" "ResourceType" NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "document" JSONB NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "releaseStatus" "ReleaseStatus" NOT NULL,
    "authorId" TEXT NOT NULL,
    "instituteId" TEXT,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceTranslation" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "default" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,

    CONSTRAINT "ResourceTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceCategory" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "ResourceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_authorId_name_key" ON "Resource"("authorId", "name");

-- CreateIndex
CREATE INDEX "ResourceTranslation_resourceId_default_idx" ON "ResourceTranslation"("resourceId", "default");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceTranslation_language_resourceId_key" ON "ResourceTranslation"("language", "resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceCategory_resourceId_categoryId_key" ON "ResourceCategory"("resourceId", "categoryId");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceTranslation" ADD CONSTRAINT "ResourceTranslation_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceCategory" ADD CONSTRAINT "ResourceCategory_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceCategory" ADD CONSTRAINT "ResourceCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
