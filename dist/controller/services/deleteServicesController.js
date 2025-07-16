"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteServicesController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeleteServicesController {
    async handle(request, reply) {
        const { id } = request.params;
        try {
            const deletedService = await prisma_1.prisma.service.delete({
                where: { id },
            });
            return reply.status(200).send(deletedService);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar serviço" });
        }
    }
}
exports.DeleteServicesController = DeleteServicesController;
