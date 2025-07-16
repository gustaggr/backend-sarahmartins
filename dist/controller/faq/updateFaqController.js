"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFaqController = void 0;
const prisma_1 = require("../../utils/prisma");
class UpdateFaqController {
    async handle(request, reply) {
        const { id } = request.params;
        const { question, answer } = request.body;
        try {
            const updatedFaq = await prisma_1.prisma.faq.update({
                where: { id },
                data: { question, answer },
            });
            return reply.status(200).send(updatedFaq);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao atualizar FAQ" });
        }
    }
}
exports.UpdateFaqController = UpdateFaqController;
