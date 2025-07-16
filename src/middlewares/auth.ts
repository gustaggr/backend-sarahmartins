import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from 'fastify';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config';

type TokenPayload = {
  id: string;
  email: string;
  iat: number;
  exp: number;
};

export function AuthMiddlewares(
  request: FastifyRequest,
  reply: FastifyReply,
  next: HookHandlerDoneFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return reply.status(401).send({ message: "Token não informado." });
  }

  const [, token] = authorization.split(" ");

  const jwtSecret = CONFIG.JWT_SECRET;
  if (!jwtSecret) {
    request.log.error("JWT_SECRET não definido.");
    return reply.status(500).send({ message: "Erro interno no servidor." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as TokenPayload;
    request.userId = {
      id: decoded.id,
      email: decoded.email
    };
    next();
  } catch (error) {
    return reply.status(401).send({ message: "Token inválido." });
  }
}
