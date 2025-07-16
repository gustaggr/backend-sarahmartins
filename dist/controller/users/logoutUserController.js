"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceClearSessionCookieController = exports.LogoutController = void 0;
const prisma_1 = require("../../utils/prisma");
const config_1 = require("../../config");
class LogoutController {
    async logout(request, reply) {
        try {
            const sessionId = request.cookies.session_id;
            if (sessionId) {
                await prisma_1.prisma.session.deleteMany({ where: { sessionId } });
            }
            // Limpa o cookie session_id no navegador (HttpOnly)
            reply.clearCookie('session_id', {
                path: '/',
                httpOnly: true,
                secure: config_1.CONFIG.NODE_ENV === 'production',
                sameSite: 'lax',
            });
            return reply.status(200).send({ message: 'Logout realizado com sucesso.' });
        }
        catch (error) {
            request.log.error(error, 'Erro ao fazer logout');
            return reply.status(500).send({ message: 'Erro interno no servidor.' });
        }
    }
}
exports.LogoutController = LogoutController;
exports.ForceClearSessionCookieController = {
    async clearSessionCookie(request, reply) {
        reply.clearCookie("session_id", {
            path: "/",
            httpOnly: true,
            secure: config_1.CONFIG.NODE_ENV === "production",
            sameSite: "lax",
        });
        return reply.status(200).send({ message: "Session cookie cleared" });
    }
};
