"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeleteUserController {
    async handle(request, reply) {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ message: 'ID do usuário é obrigatório' });
        }
        try {
            const user = await prisma_1.prisma.user.findUnique({ where: { id } });
            if (!user) {
                return reply.status(404).send({ message: 'Usuário não encontrado' });
            }
            await prisma_1.prisma.user.delete({ where: { id } });
            return reply.status(200).send({ message: 'Usuário deletado com sucesso' });
        }
        catch (error) {
            return reply.status(500).send({ message: 'Erro ao deletar usuário', error });
        }
    }
}
exports.DeleteUserController = DeleteUserController;
