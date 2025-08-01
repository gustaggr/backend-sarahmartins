/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Chat_Id` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Chat_Id` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chat_Id" ADD COLUMN     "number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Chat_Id_number_key" ON "Chat_Id"("number");
