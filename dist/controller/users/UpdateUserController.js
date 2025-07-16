"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const prisma_1 = require("../../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
class UpdateUserController {
    async handle(request, reply) {
        const { id } = request.params;
        const { name, email, password, role, crmv } = request.body;
        try {
            // Validate if the user exists
            const existingUser = await prisma_1.prisma.user.findUnique({ where: { id } });
            if (!existingUser) {
                return reply.status(404).send({ message: 'Usuário não encontrado' });
            }
            const updateData = {};
            if (name)
                updateData.name = name;
            if (email)
                updateData.email = email;
            if (role) {
                const validRoles = ['ADMIN', 'USER', 'VETERINARIO']; // Replace with your actual enum values
                const normalizedRole = role.trim().toUpperCase();
                if (!validRoles.includes(normalizedRole)) {
                    return reply.status(400).send({ message: 'Role inválido. Valores permitidos: ADMIN, USER, VETERINARIO' });
                }
                updateData.role = normalizedRole;
                if (normalizedRole === 'VETERINARIO') {
                    if (!crmv) {
                        return reply.status(400).send({ message: 'CRMV é obrigatório para veterinários' });
                    }
                    updateData.crmv = crmv;
                }
                else {
                    updateData.crmv = null;
                }
            }
            if (password) {
                updateData.password = await (0, bcryptjs_1.hash)(password, 8);
            }
            // Delete all sessions for the user
            await prisma_1.prisma.session.deleteMany({ where: { userId: id } });
            // Update the user
            const updatedUser = await prisma_1.prisma.user.update({
                where: { id },
                data: updateData,
            });
            return reply.status(200).send(updatedUser);
        }
        catch (error) {
            console.error('Error updating user:', error);
            // Handle specific Prisma errors
            if (error.code === 'P2025') {
                return reply.status(404).send({ message: 'Usuário não encontrado' });
            }
            return reply.status(500).send({ message: 'Erro ao atualizar usuário', error: error.message });
        }
    }
}
exports.UpdateUserController = UpdateUserController;
