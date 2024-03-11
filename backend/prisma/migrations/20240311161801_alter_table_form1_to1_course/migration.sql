/*
  Warnings:

  - You are about to drop the column `form_id` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_form_id_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "form_id",
ADD COLUMN     "formId" INTEGER,
ADD COLUMN     "type" "UserTypes" NOT NULL;

-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "courseId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Form_courseId_key" ON "Form"("courseId");

-- AddForeignKey
ALTER TABLE "Form" ADD CONSTRAINT "Form_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
