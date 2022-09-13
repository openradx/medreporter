-- AlterTable
ALTER TABLE "Module" ADD COLUMN     "instituteId" INTEGER;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "instituteId" INTEGER;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;
