"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeleteUserController {
    async handle(request, reply) {
        const { id } = request.params;
        try {
            await prisma_1.prisma.user.delete({ where: { id } });
            return reply.status(200).send({ message: 'Usuário deletado com sucesso' });
        }
        catch (error) {
            return reply.status(500).send({ message: 'Erro ao deletar usuário', error });
        }
    }
}
exports.DeleteUserController = DeleteUserController;
