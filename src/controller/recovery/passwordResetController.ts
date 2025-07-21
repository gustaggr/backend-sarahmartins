import { FastifyRequest, FastifyReply } from 'fastify';
import { requestPasswordResetLink, resetPasswordWithToken } from './passwordResetService';

export class SendResetLinkController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email } = request.body as { email: string };
    try {
      await requestPasswordResetLink(email);
      return reply.status(200).send({ message: 'Link de recuperação enviado.' });
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : 'Erro.' });
    }
  }
}

export class ResetPasswordWithTokenController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { token, newPassword } = request.body as { token: string; newPassword: string };
    try {
      await resetPasswordWithToken(token, newPassword);
      return reply.status(200).send({ message: 'Senha redefinida com sucesso.' });
    } catch (error) {
      return reply.status(400).send({ error: error instanceof Error ? error.message : 'Erro.' });
    }
  }
}
