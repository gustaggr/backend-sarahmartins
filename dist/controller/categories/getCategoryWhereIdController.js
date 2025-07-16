"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCategoryWhereIdController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetCategoryWhereIdController {
    async show(request, reply) {
        const { id } = request.params;
        try {
            const category = await prisma_1.prisma.category.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    _count: {
                        select: { products: true }
                    }
                }
            });
            if (!category) {
                return reply.status(404).send({ error: "Categoria não encontrada" });
            }
            const result = {
                id: category.id,
                name: category.name,
                products: category._count.products
            };
            return reply.status(200).send(result);
        }
        catch {
            return reply.status(500).send({ error: "Erro ao buscar categoria" });
        }
    }
}
exports.GetCategoryWhereIdController = GetCategoryWhereIdController;
