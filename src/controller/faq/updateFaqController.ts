import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class UpdateFaqController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const { question, answer } = request.body as {
            question: string;
            answer: string;
        };

        try {
            const updatedFaq = await prisma.faq.update({
                where: { id },
                data: { question, answer },
            });
            return reply.status(200).send(updatedFaq);
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao atualizar FAQ" });
        }
    }
}
