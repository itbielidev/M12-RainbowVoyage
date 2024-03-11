-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_form_id_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "form_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;
