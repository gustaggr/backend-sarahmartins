"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const prisma_1 = require("../../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
class ClientController {
    async store(request, reply) {
        let { name, email, phone, address, password } = request.body;
        try {
            const phoneExists = await prisma_1.prisma.client.findUnique({ where: { phone } });
            if (phoneExists) {
                return reply.status(400).send({ message: "Telefone telefone já cadastrado" });
            }
            if (!password) {
                return reply.status(400).send({ message: "Senha é obrigatória" });
            }
            const hash_password = await (0, bcryptjs_1.hash)(password, 8);
            const client = await prisma_1.prisma.client.create({
                data: {
                    name,
                    email,
                    phone,
                    address: address ?? null,
                    password: hash_password,
                }
            });
            const { password: _, ...clientWithoutPassword } = client;
            return reply.status(201).send({ message: "Cliente criado com sucesso" });
        }
        catch (error) {
            return reply.status(500).send({ message: "Erro ao criar cliente", error });
        }
    }
}
exports.ClientController = ClientController;
