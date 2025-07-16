"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFaqController = void 0;
const prisma_1 = require("../../utils/prisma");
class CreateFaqController {
    async store(request, reply) {
        const { question, answer } = request.body;
        try {
            if (!question || !answer) {
                return reply.status(400).send({ error: "Os campos obrigatórios são: question e answer" });
            }
            const faqExists = await prisma_1.prisma.faq.findFirst({ where: { question } });
            if (faqExists) {
                return reply.status(400).send({ error: "FAQ já existe" });
            }
            const faq = await prisma_1.prisma.faq.create({
                data: {
                    question,
                    answer,
                },
            });
            reply.status(201).send(faq);
        }
        catch (error) {
            reply.status(500).send({ error: "Erro ao criar FAQ: " + error });
        }
    }
}
exports.CreateFaqController = CreateFaqController;
