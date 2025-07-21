"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetTokenHandler = verifyResetTokenHandler;
const prisma_1 = require("../../utils/prisma");
async function verifyResetTokenHandler(request, reply) {
    const token = request.query.token;
    if (!token) {
        return reply.status(400).send({ error: 'Token é obrigatório.' });
    }
    const record = await prisma_1.prisma.passwordResetToken.findUnique({ where: { token } });
    if (!record) {
        return reply.status(404).send({ error: 'Token inválido.' });
    }
    if (record.expiresAt < new Date()) {
        return reply.status(400).send({ error: 'Token expirado.' });
    }
    return reply.status(200).send({ message: 'Token válido.' });
}
