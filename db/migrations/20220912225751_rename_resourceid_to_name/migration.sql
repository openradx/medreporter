/*
  Warnings:

  - You are about to drop the column `moduleId` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `reportId` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `templateId` on the `Template` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId,name]` on the table `Module` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId,name]` on the table `Template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Module_moduleId_key";

-- DropIndex
DROP INDEX "Report_reportId_key";

-- DropIndex
DROP INDEX "Template_templateId_key";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "moduleId",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "reportId";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "templateId",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Module_authorId_name_key" ON "Module"("authorId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Template_authorId_name_key" ON "Template"("authorId", "name");
