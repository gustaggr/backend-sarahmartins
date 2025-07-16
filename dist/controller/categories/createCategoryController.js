"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryController = void 0;
const prisma_1 = require("../../utils/prisma");
class CreateCategoryController {
    async store(request, reply) {
        let { name } = request.body;
        try {
            if (!name) {
                return reply.status(400).send({ error: "O nome da categoria é obrigatório" });
            }
            const categoryExists = await prisma_1.prisma.category.findUnique({ where: { name } });
            if (categoryExists) {
                return reply.status(400).send({ error: "Categoria já existe" });
            }
            const category = await prisma_1.prisma.category.create({
                data: {
                    name,
                },
            });
            reply.status(201).send(category);
        }
        catch (error) {
            reply.status(500).send({ error: "Erro ao criar categoria" + error });
        }
    }
}
exports.CreateCategoryController = CreateCategoryController;
