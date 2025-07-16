"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const prisma_1 = require("../../utils/prisma");
class CreateProductController {
    async store(request, reply) {
        const { name, description, price, type, link, status } = request.body;
        try {
            if (!name || !description || !price || !type || !status) {
                return reply.status(400).send({ error: "Os campos obrigatórios são: name, description, price, type e status" });
            }
            const productExists = await prisma_1.prisma.product.findFirst({ where: { name } });
            if (productExists) {
                return reply.status(400).send({ error: "Produto já existe" });
            }
            const product = await prisma_1.prisma.product.create({
                data: {
                    name,
                    description,
                    price,
                    type,
                    link,
                    status,
                },
            });
            reply.status(201).send(product);
        }
        catch (error) {
            reply.status(500).send({ error: "Erro ao criar produto: " + error });
        }
    }
}
exports.CreateProductController = CreateProductController;
