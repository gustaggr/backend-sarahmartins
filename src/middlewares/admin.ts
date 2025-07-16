import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import { CONFIG } from '../config';

export function AdminOrMasterKeyMiddleware(request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction) {
  const masterKey = request.headers['x-master-key'];

  // Remover log em produção por segurança
  if (CONFIG.NODE_ENV !== 'production') {
    console.log('MASTER KEY HEADER:', masterKey);
  }

  if (masterKey === CONFIG.MASTER_KEY) {
    return next();
  }

  return reply.status(401).send({ message: 'Chave de acesso inválida ou não fornecida.' });
}
