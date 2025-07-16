"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProductController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeleteProductController {
    async handle(request, reply) {
        const { id } = request.params;
        try {
            const deletedProduct = await prisma_1.prisma.product.delete({
                where: { id },
            });
            return reply.status(200).send(deletedProduct);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar produto" });
        }
    }
}
exports.DeleteProductController = DeleteProductController;
