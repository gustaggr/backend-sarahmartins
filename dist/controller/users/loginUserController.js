"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const prisma_1 = require("../../utils/prisma");
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../../config");
class AuthController {
    // Método de login
    async login(request, reply) {
        try {
            const { email, password } = request.body;
            // Validação simples
            if (!email || !password) {
                return reply.status(400).send({ message: "Email e senha são obrigatórios." });
            }
            // Busca usuário pelo email no banco
            const user = await prisma_1.prisma.user.findUnique({ where: { email } });
            if (!user || !user.password) {
                return reply.status(401).send({ message: "Email ou senha inválidos." });
            }
            // Verifica se a senha bate com o hash
            const isPasswordValid = await (0, bcryptjs_1.compare)(password, user.password);
            if (!isPasswordValid) {
                return reply.status(401).send({ message: "Email ou senha inválidos." });
            }
            // Confirma se a chave secreta JWT está definida
            const jwtSecret = config_1.CONFIG.JWT_SECRET;
            if (!jwtSecret) {
                request.log.error("JWT_SECRET não está definido.");
                return reply.status(500).send({ message: "Erro interno no servidor." });
            }
            // Gera o token JWT com dados essenciais e tempo de expiração de 2 dias
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, jwtSecret, { expiresIn: '2d' });
            // Gera um sessionId único
            const sessionId = crypto_1.default.randomUUID();
            // Data de expiração da sessão (2 dias)
            const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2);
            // Salva sessão no banco (sessionId, token, userId e expiresAt)
            await prisma_1.prisma.session.create({
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
                secure: config_1.CONFIG.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 2, // 2 dias em segundos
            });
            return reply.status(200).send({ message: "Login realizado com sucesso" });
        }
        catch (error) {
            request.log.error(error, "Erro no login");
            return reply.status(500).send({ message: "Erro interno no servidor." });
        }
    }
    // Método para verificar a validade do token pela session_id
    async verifyToken(request, reply) {
        try {
            const sessionId = request.cookies.session_id;
            if (!sessionId) {
                return reply.status(401).send({ message: 'Sessão não encontrada (session_id ausente)' });
            }
            const session = await prisma_1.prisma.session.findUnique({ where: { sessionId } });
            if (!session) {
                // Limpa cookie se a sessão não existe
                reply.clearCookie('session_id', { path: '/' });
                return reply.status(401).send({ message: 'Sessão inválida ou não encontrada' });
            }
            if (session.expiresAt < new Date()) {
                // Deleta sessão expirada
                await prisma_1.prisma.session.delete({ where: { sessionId } });
                reply.clearCookie('session_id', { path: '/' });
                return reply.status(401).send({ message: 'Sessão expirada' });
            }
            const jwtSecret = config_1.CONFIG.JWT_SECRET;
            if (!jwtSecret) {
                request.log.error("JWT_SECRET não está definido.");
                return reply.status(500).send({ message: "Erro interno no servidor." });
            }
            const decoded = jsonwebtoken_1.default.verify(session.token, jwtSecret);
            return reply.status(200).send({ message: 'Sessão válida', user: decoded });
        }
        catch (error) {
            return reply.status(401).send({ message: 'Token inválido ou erro na verificação', error: error.message });
        }
    }
    // Método opcional para logout: apaga a sessão no banco e limpa cookie
    async logout(request, reply) {
        try {
            const sessionId = request.cookies.session_id;
            if (sessionId) {
                // Apaga a sessão, mesmo que não exista (sem erro)
                await prisma_1.prisma.session.deleteMany({ where: { sessionId } });
                // Limpa cookie
                reply.clearCookie('session_id', { path: '/' });
            }
            return reply.status(200).send({ message: 'Logout realizado com sucesso' });
        }
        catch (error) {
            request.log.error(error, "Erro no logout");
            return reply.status(500).send({ message: "Erro interno no servidor." });
        }
    }
}
exports.AuthController = AuthController;
