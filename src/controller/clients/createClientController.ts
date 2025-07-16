import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";
import { hash } from "bcryptjs";

export class ClientController {
    async store(request: FastifyRequest, reply: FastifyReply) {
        let { name, email, phone, address, password } = request.body as {
            name: string;
            email: string;
            password?: string;
            phone: string;
            address?: string | null;
        };

        try {
            const phoneExists = await prisma.client.findUnique({ where: { phone } });

            if (phoneExists) {
                return reply.status(400).send({ message: "Telefone telefone já cadastrado" });
            } 

            if (!password) {
                return reply.status(400).send({ message: "Senha é obrigatória" });
            }

            const hash_password = await hash(password, 8);
            const client = await prisma.client.create({
                data: {
                    name,
                    email,
                    phone,
                    address: address ?? null,
                    password: hash_password,
                }
            });

            const { password: _, ...clientWithoutPassword } = client;
            return reply.status(201).send({message: "Cliente criado com sucesso"});

        } catch (error) {
            return reply.status(500).send({ message: "Erro ao criar cliente", error });
        }
    }
}
