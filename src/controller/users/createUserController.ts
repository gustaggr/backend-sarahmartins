import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../utils/prisma';
import { hash } from 'bcryptjs';

export class UserController {

    async store(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, password, role } = request.body as {
            name: string;
            email: string;
            password: string;
            role: string;
        };

        // Normaliza o role: remove acentos e converte para maiúsculo
        const normalizedRole = role.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

        try {
            const userExists = await prisma.user.findUnique({ where: { email } });
            if (userExists) {
                return reply.status(400).send({ message: "Email já cadastrado" });
            }

            const hash_password = await hash(password, 8);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash_password,
                    role: normalizedRole,
                }
            });

            const { password: _, ...userWithoutPassword } = user;

            return reply.status(201).send(userWithoutPassword);
        } catch (error) {
            return reply.status(500).send({ message: "Erro ao criar usuário", error });
        }
    }

}
