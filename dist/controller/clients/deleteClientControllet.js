"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClientController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeleteClientController {
    async handle(request, reply) {
        const { id } = request.params;
        try {
            // Verifica se o cliente existe
            const clientExists = await prisma_1.prisma.client.findUnique({ where: { id } });
            if (!clientExists) {
                return reply.status(404).send({ message: "Cliente não encontrado" });
            }
            // Deleta o cliente
            await prisma_1.prisma.client.delete({ where: { id } });
            return reply.status(200).send({ message: "Cliente deletado com sucesso" });
        }
        catch (error) {
            return reply.status(500).send({ message: "Erro ao deletar cliente", error: error.message });
        }
    }
}
exports.DeleteClientController = DeleteClientController;
