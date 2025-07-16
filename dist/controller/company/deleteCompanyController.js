"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCompanyController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeleteCompanyController {
    async handle(request, reply) {
        const { id } = request.params;
        try {
            const deletedCompany = await prisma_1.prisma.company.delete({
                where: { id },
            });
            return reply.status(200).send(deletedCompany);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar empresa" });
        }
    }
}
exports.DeleteCompanyController = DeleteCompanyController;
