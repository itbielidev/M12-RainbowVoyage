-- AlterTable
ALTER TABLE "City" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0;


UPDATE "City" SET "latitude" = 41.3879, "longitude" = 2.1645 WHERE "name" = 'Barcelona';
UPDATE "City" SET "latitude" = 40.4167, "longitude" = -3.7037 WHERE "name" = 'Madrid';
UPDATE "City" SET "latitude" = 39.9167, "longitude" = 1.4833 WHERE "name" = 'Ibiza';
UPDATE "City" SET "latitude" = 36.7208, "longitude" = -4.4214 WHERE "name" = 'Málaga';
UPDATE "City" SET "latitude" = 28.0114, "longitude" = -15.4528 WHERE "name" = 'Gran Canaria';

