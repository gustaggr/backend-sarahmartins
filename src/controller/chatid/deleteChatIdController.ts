import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class DeleteChatIdController {
    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { number } = request.body as { number: string };

        try {
            if (!number) {
                return reply.status(400).send({ error: "O campo obrigatório é: number" });
            }

            const chat = await prisma.chat_Id.findFirst({ where: { number } });
            if (!chat) {
                return reply.status(404).send({ error: "Nenhum chatId encontrado para este número" });
            }

            await prisma.chat_Id.delete({ where: { id: chat.id } });

            reply.status(200).send({ message: "ChatId deletado com sucesso" });
        } catch (error) {
            reply.status(500).send({ error: "Erro ao deletar chatId: " + error });
        }
    }
}
