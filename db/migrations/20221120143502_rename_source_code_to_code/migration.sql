/*
  Warnings:

  - You are about to drop the column `sourceCode` on the `Module` table. All the data in the column will be lost.
  - You are about to drop the column `sourceCode` on the `Template` table. All the data in the column will be lost.
  - Added the required column `code` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "sourceCode",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "sourceCode",
ADD COLUMN     "code" TEXT NOT NULL;
