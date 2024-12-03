-- AlterTable
ALTER TABLE "_TagToTemplate" ADD CONSTRAINT "_TagToTemplate_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TagToTemplate_AB_unique";
