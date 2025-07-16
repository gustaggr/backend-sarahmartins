import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetFaqWhereIdController {
    async show(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const faq = await prisma.faq.findUnique({
                where: { id },
                select: {
                    id: true,
                    question: true,
                    answer: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            if (!faq) {
                return reply.status(404).send({ error: "FAQ não encontrado" });
            }

            return reply.status(200).send(faq);
        } catch {
            return reply.status(500).send({ error: "Erro ao buscar FAQ" });
        }
    }
}
