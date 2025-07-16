"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductController = void 0;
const prisma_1 = require("../../utils/prisma");
class CreateProductController {
    async store(request, reply) {
        const { name, price, description, categoryId, stock } = request.body;
        try {
            let product = await prisma_1.prisma.product.create({
                data: {
                    name,
                    price,
                    description,
                    categoryId,
                    stock,
                },
            });
            return reply.status(201).send(product);
        }
        catch (error) {
            return reply.status(400).send({ error: "Falha ao criar produto", details: error });
        }
    }
}
exports.CreateProductController = CreateProductController;
