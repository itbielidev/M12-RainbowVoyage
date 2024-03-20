/*
  Warnings:

  - Added the required column `description` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description_detail` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "description_detail" TEXT NOT NULL;
