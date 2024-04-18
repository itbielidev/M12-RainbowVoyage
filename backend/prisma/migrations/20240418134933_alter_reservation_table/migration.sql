/*
  Warnings:

  - Added the required column `airportIn` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airportOut` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `llegadaFirstDay` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `llegadaLastDay` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partidaFirstDay` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partidaLastDay` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "airportIn" TEXT NOT NULL,
ADD COLUMN     "airportOut" TEXT NOT NULL,
ADD COLUMN     "llegadaFirstDay" TEXT NOT NULL,
ADD COLUMN     "llegadaLastDay" TEXT NOT NULL,
ADD COLUMN     "partidaFirstDay" TEXT NOT NULL,
ADD COLUMN     "partidaLastDay" TEXT NOT NULL;
