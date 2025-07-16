import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetProductWhereIdController {
    async show(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const product = await prisma.product.findUnique({
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
        } catch {
            return reply.status(500).send({ error: "Erro ao buscar produto" });
        }
    }
}
