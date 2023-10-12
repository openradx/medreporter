/*
  Warnings:

  - You are about to drop the column `frame` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the `Resource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResourceTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `templateId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Resource" DROP CONSTRAINT "Resource_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceTag" DROP CONSTRAINT "ResourceTag_resourceId_fkey";

-- DropForeignKey
ALTER TABLE "ResourceTag" DROP CONSTRAINT "ResourceTag_tagId_fkey";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "frame",
ADD COLUMN     "templateId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Resource";

-- DropTable
DROP TABLE "ResourceTag";

-- DropEnum
DROP TYPE "ResourceType";

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "document" JSONB NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "releaseStatus" "ReleaseStatus" NOT NULL,
    "authorId" TEXT NOT NULL,
    "instituteId" TEXT,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateTag" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "TemplateTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Template_authorId_slug_key" ON "Template"("authorId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateTag_templateId_tagId_key" ON "TemplateTag"("templateId", "tagId");

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateTag" ADD CONSTRAINT "TemplateTag_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateTag" ADD CONSTRAINT "TemplateTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
