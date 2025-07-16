import { hash } from "bcryptjs";
import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class UpdateClientController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const { name, email, phone, address, password } = request.body as {
            name?: string;
            password?: string;
            email?: string;
            phone?: string;
            address?: string;
        };
        try {
            let dataToUpdate: any = {};
            if (name) dataToUpdate.name = name;
            if (email) dataToUpdate.email = email;
            if (phone) dataToUpdate.phone = phone;
            if (address) dataToUpdate.address = address;
            if (password) {
                const hash_password = await hash(password, 8);
                dataToUpdate.password = hash_password;
            }
            const updatedClient = await prisma.client.update({
                where: { id },
                data: dataToUpdate,
            });
            const { password: _, ...clientWithoutPassword } = updatedClient;
            return reply.status(200).send(clientWithoutPassword);
        }
        catch (error) {
            reply.status(500).send({ error: "Erro ao atualizar cliente" });
        }
    }
}