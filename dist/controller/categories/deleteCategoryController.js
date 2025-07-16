"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCategoryController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeleteCategoryController {
    async handle(request, reply) {
        const { id } = request.params;
        try {
            const deletedCategory = await prisma_1.prisma.category.delete({
                where: { id },
            });
            return reply.status(200).send(deletedCategory);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar categoria" });
        }
    }
}
exports.DeleteCategoryController = DeleteCategoryController;
