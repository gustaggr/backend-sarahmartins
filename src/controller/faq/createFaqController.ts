import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class CreateFaqController {
    async store(request: FastifyRequest, reply: FastifyReply) {
        const { question, answer } = request.body as {
            question: string;
            answer: string;
        };

        try {
            if (!question || !answer) {
                return reply.status(400).send({ error: "Os campos obrigatórios são: question e answer" });
            }

            const faqExists = await prisma.faq.findFirst({ where: { question } });
            if (faqExists) {
                return reply.status(400).send({ error: "FAQ já existe" });
            }

            const faq = await prisma.faq.create({
                data: {
                    question,
                    answer,
                },
            });

            reply.status(201).send(faq);
        } catch (error) {
            reply.status(500).send({ error: "Erro ao criar FAQ: " + error });
        }
    }
}
