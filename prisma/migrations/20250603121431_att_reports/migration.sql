/*
  Warnings:

  - You are about to drop the column `numero` on the `Reports` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `Reports` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Reports_numero_key";

-- AlterTable
ALTER TABLE "Reports" DROP COLUMN "numero",
ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Reports_number_key" ON "Reports"("number");
