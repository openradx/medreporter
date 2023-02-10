/*
  Warnings:

  - A unique constraint covering the columns `[type,authorId,name]` on the table `Resource` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Resource_authorId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Resource_type_authorId_name_key" ON "Resource"("type", "authorId", "name");
