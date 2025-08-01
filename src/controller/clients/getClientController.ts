import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetClientController {
    async index(request: FastifyRequest, reply: FastifyReply) {
        try {
            const clients = await prisma.cliente.findMany({
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
            return reply.status(200).send(clients);
        } catch {
            return reply.status(500).send({ error: "Erro ao buscar clientes" });
        }
    }
}
