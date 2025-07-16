import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class DeleteClientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        try {
            // Verifica se o cliente existe
            const clientExists = await prisma.client.findUnique({ where: { id } });
            if (!clientExists) {
                return reply.status(404).send({ message: "Cliente não encontrado" });
            }

            // Deleta o cliente
            await prisma.client.delete({ where: { id } });

            return reply.status(200).send({ message: "Cliente deletado com sucesso" });
        } catch (error: any) {
            return reply.status(500).send({ message: "Erro ao deletar cliente", error: error.message });
        }
    }
}