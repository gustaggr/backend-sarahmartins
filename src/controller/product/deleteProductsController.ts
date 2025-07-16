import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class DeleteProductController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        try {
            const deletedProduct = await prisma.product.delete({
                where: { id },
            });
            return reply.status(200).send(deletedProduct);
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar produto" });
        }
    }
}