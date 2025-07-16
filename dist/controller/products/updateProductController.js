"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductController = void 0;
const prisma_1 = require("../../utils/prisma");
class UpdateProductController {
    async handle(request, reply) {
        const { id } = request.params;
        const { name, price, categoryId } = request.body;
        // Build the data object dynamically to only include provided fields
        const data = {};
        if (name !== undefined)
            data.name = name;
        if (price !== undefined)
            data.price = price;
        if (categoryId !== undefined)
            data.categoryId = categoryId;
        try {
            const updatedProduct = await prisma_1.prisma.product.update({
                where: { id },
                data,
            });
            return reply.status(200).send(updatedProduct);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao atualizar produto" });
        }
    }
}
exports.UpdateProductController = UpdateProductController;
