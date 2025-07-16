"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetProductController {
    async index(request, reply) {
        try {
            const product = await prisma_1.prisma.product.findMany({
                include: {
                    category: true
                }
            });
            return reply.status(200).send(product);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar produto" });
        }
    }
}
exports.GetProductController = GetProductController;
