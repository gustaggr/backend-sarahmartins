import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../utils/prisma';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { CONFIG } from '../../config';

export class AuthController {

  // Método de login
  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as { email: string; password: string };

      // Validação simples
      if (!email || !password) {
        return reply.status(400).send({ message: "Email e senha são obrigatórios." });
      }

      // Busca usuário pelo email no banco
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !user.password) {
        return reply.status(401).send({ message: "Email ou senha inválidos." });
      }

      // Verifica se a senha bate com o hash
      const isPasswordValid = await compare(password, user.password);
      if (!isPasswordValid) {
        return reply.status(401).send({ message: "Email ou senha inválidos." });
      }

      // Confirma se a chave secreta JWT está definida
      const jwtSecret = CONFIG.JWT_SECRET;
      if (!jwtSecret) {
        request.log.error("JWT_SECRET não está definido.");
        return reply.status(500).send({ message: "Erro interno no servidor." });
      }

      // Gera o token JWT com dados essenciais e tempo de expiração de 2 dias
      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        jwtSecret,
        { expiresIn: '2d' }
      );

      // Gera um sessionId único
      const sessionId = crypto.randomUUID();

      // Data de expiração da sessão (2 dias)
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);

      // Salva sessão no banco (sessionId, token, userId e expiresAt)
      await prisma.session.create({
        data: {
          sessionId,
          token,
          userId: user.id,
          expiresAt,
        }
      });

      // Salva o sessionId no cookie HTTP only para segurança
      reply.setCookie('session_id', sessionId, {
        httpOnly: true,
        secure: CONFIG.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 2, // 2 dias em segundos
      });

      return reply.status(200).send({ message: "Login realizado com sucesso" });

    } catch (error) {
      request.log.error(error, "Erro no login");
      return reply.status(500).send({ message: "Erro interno no servidor." });
    }
  }

  // Método para verificar a validade do token pela session_id
  async verifyToken(request: FastifyRequest, reply: FastifyReply) {
    try {
      const sessionId = request.cookies.session_id;

      if (!sessionId) {
        return reply.status(401).send({ message: 'Sessão não encontrada (session_id ausente)' });
      }

      const session = await prisma.session.findUnique({ where: { sessionId } });

      if (!session) {
        // Limpa cookie se a sessão não existe
        reply.clearCookie('session_id', { path: '/' });
        return reply.status(401).send({ message: 'Sessão inválida ou não encontrada' });
      }

      if (session.expiresAt < new Date()) {
        // Deleta sessão expirada
        await prisma.session.delete({ where: { sessionId } });
        reply.clearCookie('session_id', { path: '/' });
        return reply.status(401).send({ message: 'Sessão expirada' });
      }

      const jwtSecret = CONFIG.JWT_SECRET;
      if (!jwtSecret) {
        request.log.error("JWT_SECRET não está definido.");
        return reply.status(500).send({ message: "Erro interno no servidor." });
      }

      const decoded = jwt.verify(session.token, jwtSecret);

      return reply.status(200).send({ message: 'Sessão válida', user: decoded });

    } catch (error: any) {
      return reply.status(401).send({ message: 'Token inválido ou erro na verificação', error: error.message });
    }
  }

  // Método opcional para logout: apaga a sessão no banco e limpa cookie
  async logout(request: FastifyRequest, reply: FastifyReply) {
    try {
      const sessionId = request.cookies.session_id;

      if (sessionId) {
        // Apaga a sessão, mesmo que não exista (sem erro)
        await prisma.session.deleteMany({ where: { sessionId } });

        // Limpa cookie
        reply.clearCookie('session_id', { path: '/' });
      }

      return reply.status(200).send({ message: 'Logout realizado com sucesso' });

    } catch (error) {
      request.log.error(error, "Erro no logout");
      return reply.status(500).send({ message: "Erro interno no servidor." });
    }
  }
}
