"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductWhereIdController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetProductWhereIdController {
    async show(request, reply) {
        const { id } = request.params;
        try {
            const product = await prisma_1.prisma.product.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    type: true,
                    link: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            if (!product) {
                return reply.status(404).send({ error: "Produto não encontrado" });
            }
            return reply.status(200).send(product);
        }
        catch {
            return reply.status(500).send({ error: "Erro ao buscar produto" });
        }
    }
}
exports.GetProductWhereIdController = GetProductWhereIdController;
