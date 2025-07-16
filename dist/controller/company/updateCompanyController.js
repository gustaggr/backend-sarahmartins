"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompanyController = void 0;
const prisma_1 = require("../../utils/prisma");
class UpdateCompanyController {
    async handle(request, reply) {
        const { id } = request.params;
        const { nome, logo } = request.body;
        const updateData = {
            ...(nome !== undefined && { nome }),
            ...(logo !== undefined && { logo }),
        };
        try {
            const updatedCompany = await prisma_1.prisma.company.update({
                where: { id },
                data: updateData,
            });
            return reply.status(200).send(updatedCompany);
        }
        catch (error) {
            return reply.status(500).send({ error: `Erro ao atualizar empresa: ${error}` });
        }
    }
}
exports.UpdateCompanyController = UpdateCompanyController;
