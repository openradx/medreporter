/*
  Warnings:

  - You are about to drop the `ModuleTagTranslation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TemplateTagTranslation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModuleTagTranslation" DROP CONSTRAINT "ModuleTagTranslation_moduleTranslationId_fkey";

-- DropForeignKey
ALTER TABLE "TemplateTagTranslation" DROP CONSTRAINT "TemplateTagTranslation_templateTranslationId_fkey";

-- DropTable
DROP TABLE "ModuleTagTranslation";

-- DropTable
DROP TABLE "TemplateTagTranslation";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagTranslation" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TagTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleTag" (
    "id" SERIAL NOT NULL,
    "moduleId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "ModuleTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateTag" (
    "id" SERIAL NOT NULL,
    "templateId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,

    CONSTRAINT "TemplateTag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModuleTag_moduleId_tagId_key" ON "ModuleTag"("moduleId", "tagId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateTag_templateId_tagId_key" ON "TemplateTag"("templateId", "tagId");

-- AddForeignKey
ALTER TABLE "TagTranslation" ADD CONSTRAINT "TagTranslation_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleTag" ADD CONSTRAINT "ModuleTag_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleTag" ADD CONSTRAINT "ModuleTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateTag" ADD CONSTRAINT "TemplateTag_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateTag" ADD CONSTRAINT "TemplateTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
