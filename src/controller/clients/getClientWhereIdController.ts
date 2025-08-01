import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetClientWhereIdController {
    async show(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const client = await prisma.cliente.findUnique({
                where: { id },
                select: {
                    id: true,
                    nome: true,
                    numero: true,
                    email: true,
                    cursos: true,
                    criadoEm: true,
                    atualizadoEm: true
                }
            });

            if (!client) {
                return reply.status(404).send({ error: "Cliente não encontrado" });
            }

            return reply.status(200).send(client);
        } catch {
            return reply.status(500).send({ error: "Erro ao buscar cliente" });
        }
    }
}
