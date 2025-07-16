"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetProductController {
    async index(request, reply) {
        try {
            const products = await prisma_1.prisma.product.findMany({
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
            return reply.status(200).send(products);
        }
        catch {
            return reply.status(500).send({ error: "Erro ao buscar produtos" });
        }
    }
}
exports.GetProductController = GetProductController;
