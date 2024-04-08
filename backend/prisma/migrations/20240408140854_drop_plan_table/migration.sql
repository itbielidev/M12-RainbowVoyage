/*
  Warnings:

  - You are about to drop the column `plan_id` on the `DateAvailabilty` table. All the data in the column will be lost.
  - You are about to drop the column `plan_id` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `experience_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DateAvailabilty" DROP CONSTRAINT "DateAvailabilty_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_experience_id_fkey";

-- DropForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_plan_id_fkey";

-- AlterTable
ALTER TABLE "DateAvailabilty" DROP COLUMN "plan_id",
ADD COLUMN     "experience_id" INTEGER;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "plan_id",
ADD COLUMN     "experience_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Plan";

-- AddForeignKey
ALTER TABLE "DateAvailabilty" ADD CONSTRAINT "DateAvailabilty_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
