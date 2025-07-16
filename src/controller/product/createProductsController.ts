import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class CreateProductController {
    async store(request: FastifyRequest, reply: FastifyReply) {
        const { name, description, price, type, link, status } = request.body as {
            name: string;
            description: string;
            price: string;
            type: string;
            link?: string;
            status: string;
        };

        try {
            if (!name || !description || !price || !type || !status) {
                return reply.status(400).send({ error: "Os campos obrigatórios são: name, description, price, type e status" });
            }

            const productExists = await prisma.product.findFirst({ where: { name } });
            if (productExists) {
                return reply.status(400).send({ error: "Produto já existe" });
            }

            const product = await prisma.product.create({
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
        } catch (error) {
            reply.status(500).send({ error: "Erro ao criar produto: " + error });
        }
    }
}
