"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const prisma_1 = require("../../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
class UserController {
    async store(request, reply) {
        let { name, email, password, role, crmv, avatar } = request.body;
        // Normaliza o role: remove acentos e converte para maiúsculo
        role = role.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
        try {
            const userExists = await prisma_1.prisma.user.findUnique({ where: { email } });
            if (userExists) {
                return reply.status(400).send({ message: "Email já cadastrado" });
            }
            if (role === 'VETERINARIO' && (!crmv || crmv.trim() === '')) {
                return reply.status(400).send({ message: "CRMV é obrigatório para veterinários" });
            }
            const hash_password = await (0, bcryptjs_1.hash)(password, 8);
            const user = await prisma_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password: hash_password,
                    role: role,
                    crmv: role === 'VETERINARIO' ? crmv : null,
                    avatar: avatar ?? null,
                }
            });
            const { password: _, ...userWithoutPassword } = user;
            return reply.status(201).send(userWithoutPassword);
        }
        catch (error) {
            return reply.status(500).send({ message: "Erro ao criar usuário", error });
        }
    }
}
exports.UserController = UserController;
