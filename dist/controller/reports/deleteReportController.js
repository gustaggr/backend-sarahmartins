"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteReportsController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeleteReportsController {
    async handle(request, reply) {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ error: "ID do pet não fornecido" });
        }
        try {
            // Delete related reports first to avoid foreign key constraint violation
            const deletedReports = await prisma_1.prisma.reports.delete({
                where: { id },
            });
            if (!deletedReports) {
                return reply.status(404).send({ error: "Relatório não encontrado" });
            }
            return reply.status(200).send({ sucess: "Relatório deletado com sucesso" });
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar laudo: " + error });
        }
    }
}
exports.DeleteReportsController = DeleteReportsController;
