/*
  Warnings:

  - You are about to drop the column `dni` on the `User` table. All the data in the column will be lost.
  - Added the required column `price` to the `Experience` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dates` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reservation_email` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_dni_key";

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "dates" TEXT NOT NULL,
ADD COLUMN     "dni" VARCHAR(9) NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" VARCHAR(9) NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "reservation_email" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dni";
