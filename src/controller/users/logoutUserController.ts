import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../utils/prisma';
import { CONFIG } from '../../config';

export class LogoutController {
    async logout(request: FastifyRequest, reply: FastifyReply) {
        try {
            const sessionId = request.cookies.session_id;
            if (sessionId) {
                await prisma.session.deleteMany({ where: { sessionId } });
            }
            // Limpa o cookie session_id no navegador (HttpOnly)
            reply.clearCookie('session_id', {
                path: '/',
                httpOnly: true,
                secure: CONFIG.NODE_ENV === 'production',
                sameSite: 'lax',
            });
            return reply.status(200).send({ message: 'Logout realizado com sucesso.' });
        } catch (error) {
            request.log.error(error, 'Erro ao fazer logout');
            return reply.status(500).send({ message: 'Erro interno no servidor.' });
        }
    }
}

export const ForceClearSessionCookieController = {
    async clearSessionCookie(request: FastifyRequest, reply: FastifyReply) {
        reply.clearCookie("session_id", {
            path: "/",
            httpOnly: true,
            secure: CONFIG.NODE_ENV === "production",
            sameSite: "lax",
        });

        return reply.status(200).send({ message: "Session cookie cleared" });
    }
}