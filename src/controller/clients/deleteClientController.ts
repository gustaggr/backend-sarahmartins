import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class DeleteClientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        try {
            const deletedClient = await prisma.cliente.delete({
                where: { id },
            });
            return reply.status(200).send(deletedClient);
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar cliente" });
        }
    }
}