import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class DeleteFaqController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        try {
            const deletedFaq = await prisma.faq.delete({
                where: { id },
            });
            return reply.status(200).send(deletedFaq);
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar FAQ" });
        }
    }
}