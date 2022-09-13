/*
  Warnings:

  - You are about to drop the column `languages` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `languages` on the `Template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "languages";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "languages";

-- CreateIndex
CREATE INDEX "ModuleTranslation_moduleId_default_idx" ON "ModuleTranslation"("moduleId", "default");

-- CreateIndex
CREATE INDEX "TemplateTranslation_templateId_default_idx" ON "TemplateTranslation"("templateId", "default");
