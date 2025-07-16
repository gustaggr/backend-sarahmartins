"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoryController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetCategoryController {
    async index(request, reply) {
        try {
            const categories = await prisma_1.prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                    _count: {
                        select: { products: true }
                    }
                }
            });
            // Retornando apenas os campos desejados
            const result = categories.map(cat => ({
                id: cat.id,
                name: cat.name,
                products: cat._count.products
            }));
            return reply.status(200).send(result);
        }
        catch {
            return reply.status(500).send({ error: "Erro ao buscar categoria" });
        }
    }
}
exports.GetCategoryController = GetCategoryController;
