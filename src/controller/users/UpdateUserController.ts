import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../utils/prisma';
import { hash } from 'bcryptjs';

export class UpdateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { name, email, password, role } = request.body as {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    };

    try {
      // Validate if the user exists
      const existingUser = await prisma.user.findUnique({ where: { id } });
      if (!existingUser) {
        return reply.status(404).send({ message: 'Usuário não encontrado' });
      }

      const updateData: Record<string, any> = {};

      if (name) updateData.name = name;
      if (email) updateData.email = email;

      if (role) {
        const validRoles = ['ADMIN', 'USER', 'VETERINARIO']; // Replace with your actual enum values
        const normalizedRole = role.trim().toUpperCase();

        if (!validRoles.includes(normalizedRole)) {
          return reply.status(400).send({ message: 'Role inválido. Valores permitidos: ADMIN, USER, VETERINARIO' });
        }

        updateData.role = normalizedRole;
      }

      if (password) {
        updateData.password = await hash(password, 8);
      }

      // Update the user
      const updatedUser = await prisma.user.update({
        where: { id },
        data: updateData,
      });

      return reply.status(200).send(updatedUser);
    } catch (error: any) {
      console.error('Error updating user:', error);

      // Handle specific Prisma errors
      if (error.code === 'P2025') {
        return reply.status(404).send({ message: 'Usuário não encontrado' });
      }

      return reply.status(500).send({ message: 'Erro ao atualizar usuário', error: error.message });
    }
  }
}
