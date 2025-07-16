/*
  Warnings:

  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consultation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReportImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_petId_fkey";

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_petId_fkey";

-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_petId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- DropForeignKey
ALTER TABLE "ReportImage" DROP CONSTRAINT "ReportImage_reportId_fkey";

-- DropTable
DROP TABLE "Appointment";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Consultation";

-- DropTable
DROP TABLE "Pet";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "ReportImage";

-- DropEnum
DROP TYPE "AnimalType";

-- DropEnum
DROP TYPE "AppointmentStatus";

-- DropEnum
DROP TYPE "ConsultationStatus";

-- DropEnum
DROP TYPE "PetSize";

-- DropEnum
DROP TYPE "Sexo";
