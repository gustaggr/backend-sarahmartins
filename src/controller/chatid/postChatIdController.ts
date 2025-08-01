import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class CreateChatIdController {
    async store(request: FastifyRequest, reply: FastifyReply) {
        const { number } = request.body as { number: string };

        try {
            if (!number) {
                return reply.status(400).send({ error: "O campo obrigatório é: number" });
            }

            const chatExists = await prisma.chat_Id.findFirst({ where: { number } });
            if (chatExists) {
                return reply.status(200).send({ chatId: chatExists.chatId });
            }

            let chatId: string;
            do {
                chatId = this.generateChatId();
            } while (await prisma.chat_Id.findFirst({ where: { chatId } }));

            const chat = await prisma.chat_Id.create({
                data: {
                    number,
                    chatId,
                },
            });

            reply.status(201).send(chat);
        } catch (error) {
            reply.status(500).send({ error: "Erro ao criar chatId: " + error });
        }
    }

    private generateChatId(): string {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < 32; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}
