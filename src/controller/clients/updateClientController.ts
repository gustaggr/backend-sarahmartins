import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class UpdateClientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const { nome, numero, email, cursos } = request.body as {
            nome: string;
            numero: string;
            email?: string;
            cursos: string[];
        };

        try {
            const updatedClient = await prisma.cliente.update({
                where: { id },
                data: { nome, numero, email, cursos },
            });
            return reply.status(200).send(updatedClient);
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao atualizar cliente" });
        }
    }
}
