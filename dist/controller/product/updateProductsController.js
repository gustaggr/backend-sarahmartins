"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductController = void 0;
const prisma_1 = require("../../utils/prisma");
class UpdateProductController {
    async handle(request, reply) {
        const { id } = request.params;
        const { name, description, price, type, link, status } = request.body;
        try {
            const updatedProduct = await prisma_1.prisma.product.update({
                where: { id },
                data: { name, description, price, type, link, status },
            });
            return reply.status(200).send(updatedProduct);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao atualizar produto" });
        }
    }
}
exports.UpdateProductController = UpdateProductController;
