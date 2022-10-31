/*
  Warnings:

  - The values [UNPUBLISHED] on the enum `ReleaseStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `visibility` to the `Module` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visibility` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReleaseStatus_new" AS ENUM ('DRAFT', 'PUBLISHED', 'DEPRECIATED');
ALTER TABLE "Module" ALTER COLUMN "releaseStatus" TYPE "ReleaseStatus_new" USING ("releaseStatus"::text::"ReleaseStatus_new");
ALTER TABLE "Template" ALTER COLUMN "releaseStatus" TYPE "ReleaseStatus_new" USING ("releaseStatus"::text::"ReleaseStatus_new");
ALTER TYPE "ReleaseStatus" RENAME TO "ReleaseStatus_old";
ALTER TYPE "ReleaseStatus_new" RENAME TO "ReleaseStatus";
DROP TYPE "ReleaseStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "visibility" "Visibility" NOT NULL;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "visibility" "Visibility" NOT NULL;
