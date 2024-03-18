-- CreateEnum
CREATE TYPE "UserTypes" AS ENUM ('client', 'admin');

-- CreateEnum
CREATE TYPE "ExperienceTypes" AS ENUM ('gastronomic', 'cultural', 'festive');

-- CreateEnum
CREATE TYPE "ReservationState" AS ENUM ('completed', 'cancelled', 'pending');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "dni" VARCHAR(9),
    "address" TEXT,
    "city" TEXT,
    "phone" VARCHAR(9),
    "password_hash" VARCHAR(255) NOT NULL,
    "salt_hash" VARCHAR(255) NOT NULL,
    "type" "UserTypes" NOT NULL,
    "registered_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "preference_id" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" SERIAL NOT NULL,
    "price_min" INTEGER,
    "price_max" INTEGER,
    "types" "ExperienceTypes"[],
    "num_people_min" INTEGER,
    "num_people_max" INTEGER,
    "duration_min" INTEGER,
    "duration_max" INTEGER,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "city_id" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" "ExperienceTypes" NOT NULL,
    "num_people" INTEGER NOT NULL,
    "descriptions" TEXT[],
    "days_descriptions" TEXT[],
    "images" TEXT[],

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT[],
    "experience_id" INTEGER,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DateAvailabilty" (
    "id" SERIAL NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "max_people" INTEGER NOT NULL,
    "current_people" INTEGER NOT NULL DEFAULT 0,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "plan_id" INTEGER,

    CONSTRAINT "DateAvailabilty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL,
    "state" "ReservationState" NOT NULL,
    "num_people" INTEGER NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_dni_key" ON "User"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "User_preference_id_key" ON "User"("preference_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_preference_id_fkey" FOREIGN KEY ("preference_id") REFERENCES "UserPreference"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_experience_id_fkey" FOREIGN KEY ("experience_id") REFERENCES "Experience"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DateAvailabilty" ADD CONSTRAINT "DateAvailabilty_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
