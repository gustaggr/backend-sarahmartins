"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFaqController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetFaqController {
    async index(request, reply) {
        try {
            const faqs = await prisma_1.prisma.faq.findMany({
                select: {
                    id: true,
                    question: true,
                    answer: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return reply.status(200).send(faqs);
        }
        catch {
            return reply.status(500).send({ error: "Erro ao buscar FAQs" });
        }
    }
}
exports.GetFaqController = GetFaqController;
