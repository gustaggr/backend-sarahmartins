"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryController = void 0;
const prisma_1 = require("../../utils/prisma");
class UpdateCategoryController {
    async handle(request, reply) {
        const { id } = request.params;
        const { name } = request.body;
        try {
            const updatedCategory = await prisma_1.prisma.category.update({
                where: { id },
                data: { name },
            });
            return reply.status(200).send(updatedCategory);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao atualizar categoria" });
        }
    }
}
exports.UpdateCategoryController = UpdateCategoryController;
