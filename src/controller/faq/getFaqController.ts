import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetFaqController {
    async index(request: FastifyRequest, reply: FastifyReply) {
        try {
            const faqs = await prisma.faq.findMany({
                select: {
                    id: true,
                    question: true,
                    answer: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return reply.status(200).send(faqs);
        } catch {
            return reply.status(500).send({ error: "Erro ao buscar FAQs" });
        }
    }
}
