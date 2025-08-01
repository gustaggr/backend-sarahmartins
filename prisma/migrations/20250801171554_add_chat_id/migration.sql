-- CreateTable
CREATE TABLE "Chat_Id" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chat_Id_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_Id_chatId_key" ON "Chat_Id"("chatId");
