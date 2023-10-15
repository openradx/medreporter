/*
  Warnings:

  - You are about to drop the column `slug` on the `Template` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId,name]` on the table `Template` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Template_authorId_slug_key";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "slug",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Template_authorId_name_key" ON "Template"("authorId", "name");
