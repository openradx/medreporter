/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[language,label]` on the table `TagTranslation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tag_key_key" ON "Tag"("key");

-- CreateIndex
CREATE UNIQUE INDEX "TagTranslation_language_label_key" ON "TagTranslation"("language", "label");
