/*
  Warnings:

  - The values [DEPRECIATED] on the enum `ReleaseStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReleaseStatus_new" AS ENUM ('DRAFT', 'PUBLISHED', 'DEPRECATED');
ALTER TABLE "Template" ALTER COLUMN "releaseStatus" TYPE "ReleaseStatus_new" USING ("releaseStatus"::text::"ReleaseStatus_new");
ALTER TYPE "ReleaseStatus" RENAME TO "ReleaseStatus_old";
ALTER TYPE "ReleaseStatus_new" RENAME TO "ReleaseStatus";
DROP TYPE "ReleaseStatus_old";
COMMIT;
