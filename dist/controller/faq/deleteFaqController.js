"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteFaqController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeleteFaqController {
    async handle(request, reply) {
        const { id } = request.params;
        try {
            const deletedFaq = await prisma_1.prisma.faq.delete({
                where: { id },
            });
            return reply.status(200).send(deletedFaq);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar FAQ" });
        }
    }
}
exports.DeleteFaqController = DeleteFaqController;
