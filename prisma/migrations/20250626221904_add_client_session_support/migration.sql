-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "clientId" TEXT,
ALTER COLUMN "userId" DROP NOT NULL;
