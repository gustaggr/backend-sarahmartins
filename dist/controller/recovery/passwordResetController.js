"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordWithTokenController = exports.SendResetLinkController = void 0;
const passwordResetService_1 = require("./passwordResetService");
class SendResetLinkController {
    async handle(request, reply) {
        const { email } = request.body;
        try {
            await (0, passwordResetService_1.requestPasswordResetLink)(email);
            return reply.status(200).send({ message: 'Link de recuperação enviado.' });
        }
        catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : 'Erro.' });
        }
    }
}
exports.SendResetLinkController = SendResetLinkController;
class ResetPasswordWithTokenController {
    async handle(request, reply) {
        const { token, newPassword } = request.body;
        try {
            await (0, passwordResetService_1.resetPasswordWithToken)(token, newPassword);
            return reply.status(200).send({ message: 'Senha redefinida com sucesso.' });
        }
        catch (error) {
            return reply.status(400).send({ error: error instanceof Error ? error.message : 'Erro.' });
        }
    }
}
exports.ResetPasswordWithTokenController = ResetPasswordWithTokenController;
