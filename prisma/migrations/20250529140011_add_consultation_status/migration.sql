-- CreateEnum
CREATE TYPE "ConsultationStatus" AS ENUM ('PENDENTE', 'CONFIRMADA', 'CANCELADA');

-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "status" "ConsultationStatus" NOT NULL DEFAULT 'PENDENTE';
