import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../utils/prisma';

export class DeleteUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };

    if (!id) {
      return reply.status(400).send({ message: 'ID do usuário é obrigatório' });
    }

    try {
      const user = await prisma.user.findUnique({ where: { id } });

      if (!user) {
        return reply.status(404).send({ message: 'Usuário não encontrado' });
      }

      await prisma.user.delete({ where: { id } });
      return reply.status(200).send({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      return reply.status(500).send({ message: 'Erro ao deletar usuário', error });
    }
  }
}
