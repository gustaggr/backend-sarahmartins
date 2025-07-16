import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetProductController {
    async index(request: FastifyRequest, reply: FastifyReply) {
        try {
            const products = await prisma.product.findMany({
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
        } catch {
            return reply.status(500).send({ error: "Erro ao buscar produtos" });
        }
    }
}
