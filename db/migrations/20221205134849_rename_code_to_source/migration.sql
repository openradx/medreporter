/*
  Warnings:

  - You are about to drop the column `code` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Template` table. All the data in the column will be lost.
  - Added the required column `source` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "code",
ADD COLUMN     "source" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "code",
ADD COLUMN     "source" TEXT NOT NULL;
