"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestPasswordResetLink = requestPasswordResetLink;
exports.resetPasswordWithToken = resetPasswordWithToken;
const crypto_1 = require("crypto");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailService_1 = require("./emailService");
const prisma_1 = require("../../utils/prisma");
async function requestPasswordResetLink(email) {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user)
        throw new Error('E-mail não encontrado.');
    const token = (0, crypto_1.randomUUID)();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15); // 15 minutos
    await prisma_1.prisma.passwordResetToken.deleteMany({ where: { email } });
    await prisma_1.prisma.passwordResetToken.create({
        data: { email, token, expiresAt },
    });
    const frontendUrl = process.env.FRONTEND_URL;
    const link = `${frontendUrl}trocar-senha?token=${token}`;
    await (0, emailService_1.sendPasswordResetEmail)(email, link);
}
async function resetPasswordWithToken(token, newPassword) {
    const record = await prisma_1.prisma.passwordResetToken.findUnique({ where: { token } });
    if (!record)
        throw new Error('Token inválido.');
    if (record.expiresAt < new Date())
        throw new Error('Token expirado.');
    const hashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
    await prisma_1.prisma.user.update({
        where: { email: record.email },
        data: { password: hashedPassword },
    });
    await prisma_1.prisma.passwordResetToken.delete({ where: { token } });
}
