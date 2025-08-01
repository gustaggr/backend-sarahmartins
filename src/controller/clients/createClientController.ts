import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class CreateClientController {
    async store(request: FastifyRequest, reply: FastifyReply) {
        const { nome, numero, email, cursos } = request.body as {
            nome: string;
            numero: string;
            email?: string;
            cursos: string[];
        };

        try {
            if (!nome || !numero || !cursos) {
                return reply.status(400).send({ error: "Os campos obrigatórios são: nome, numero e cursos" });
            }

            const clientExists = await prisma.cliente.findFirst({ where: { numero } });
            if (clientExists) {
                return reply.status(400).send({ error: "Cliente já existe com este número" });
            }

            const client = await prisma.cliente.create({
                data: {
                    nome,
                    numero,
                    email,
                    cursos,
                },
            });

            reply.status(201).send(client);
        } catch (error) {
            reply.status(500).send({ error: "Erro ao criar cliente: " + error });
        }
    }
}
