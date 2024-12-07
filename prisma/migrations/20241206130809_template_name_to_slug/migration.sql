/*
  Warnings:

  - You are about to drop the column `peferences` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `locale` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TagToTemplate` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authorId,slug]` on the table `Template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `preferences` to the `Report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Template` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_TagToTemplate" DROP CONSTRAINT "_TagToTemplate_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagToTemplate" DROP CONSTRAINT "_TagToTemplate_B_fkey";

-- DropIndex
DROP INDEX "Template_authorId_name_key";

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "peferences",
ADD COLUMN     "preferences" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "locale",
DROP COLUMN "name",
ADD COLUMN     "language" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_TagToTemplate";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToTemplate" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToTemplate_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_key_key" ON "Category"("key");

-- CreateIndex
CREATE INDEX "_CategoryToTemplate_B_index" ON "_CategoryToTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Template_authorId_slug_key" ON "Template"("authorId", "slug");

-- AddForeignKey
ALTER TABLE "_CategoryToTemplate" ADD CONSTRAINT "_CategoryToTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTemplate" ADD CONSTRAINT "_CategoryToTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
