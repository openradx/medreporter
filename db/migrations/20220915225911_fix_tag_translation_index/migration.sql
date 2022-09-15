/*
  Warnings:

  - A unique constraint covering the columns `[tagId,language]` on the table `TagTranslation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TagTranslation_language_label_key";

-- CreateIndex
CREATE UNIQUE INDEX "TagTranslation_tagId_language_key" ON "TagTranslation"("tagId", "language");
