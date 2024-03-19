/*
  Warnings:

  - You are about to drop the column `types` on the `UserPreference` table. All the data in the column will be lost.
  - Added the required column `type` to the `UserPreference` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserPreference" DROP COLUMN "types",
ADD COLUMN     "type" "ExperienceTypes" NOT NULL;
