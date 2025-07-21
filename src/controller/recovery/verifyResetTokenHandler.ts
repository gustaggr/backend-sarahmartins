import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../utils/prisma';

export async function verifyResetTokenHandler(request: FastifyRequest, reply: FastifyReply) {
    const token = (request.query as { token?: string }).token;

    if (!token) {
        return reply.status(400).send({ error: 'Token é obrigatório.' });
    }

    const record = await prisma.passwordResetToken.findUnique({ where: { token } });

    if (!record) {
        return reply.status(404).send({ error: 'Token inválido.' });
    }

    if (record.expiresAt < new Date()) {
        return reply.status(400).send({ error: 'Token expirado.' });
    }

    return reply.status(200).send({ message: 'Token válido.' });
}
