import { FastifyRequest, FastifyReply } from 'fastify';
import { CONFIG } from '../config';
import { prisma } from '../utils/prisma';
import jwt from 'jsonwebtoken';

export async function AdminOrMasterKeyMiddleware(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  try {
    const masterKey = request.headers['x-master-key'];

    if (CONFIG.NODE_ENV !== 'production') {
      console.log('MASTER KEY HEADER:', masterKey);
    }

    if (masterKey === CONFIG.MASTER_KEY) {
      return; // Autorizado com master key
    }

    const sessionId = request.cookies.session_id;
    if (!sessionId) {
      reply.status(401).send({ message: 'Acesso negado. Master key ou sessão válida necessária.' });
      return;
    }

    const session = await prisma.session.findUnique({ where: { sessionId } });
    if (!session || session.expiresAt < new Date()) {
      if (session) await prisma.session.delete({ where: { sessionId } });
      reply.clearCookie('session_id', { path: '/' });
      reply.status(401).send({ message: 'Sessão inválida ou expirada.' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: session.userId } });
    if (!user) {
      await prisma.session.delete({ where: { sessionId } });
      reply.clearCookie('session_id', { path: '/' });
      reply.status(401).send({ message: 'Usuário não encontrado.' });
      return;
    }

    const jwtSecret = CONFIG.JWT_SECRET;
    if (!jwtSecret) {
      reply.status(500).send({ message: "Erro interno no servidor." });
      return;
    }

    jwt.verify(session.token, jwtSecret);

    // Adiciona user na request
    (request as any).user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    return;
  } catch (error) {
    console.error('Erro no middleware:', error);
    reply.status(401).send({ message: 'Token inválido ou erro na autenticação.' });
  }
}
