"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFaqWhereIdController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetFaqWhereIdController {
    async show(request, reply) {
        const { id } = request.params;
        try {
            const faq = await prisma_1.prisma.faq.findUnique({
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
        }
        catch {
            return reply.status(500).send({ error: "Erro ao buscar FAQ" });
        }
    }
}
exports.GetFaqWhereIdController = GetFaqWhereIdController;
