"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompanyWhereIdController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetCompanyWhereIdController {
    async index(request, reply) {
        const { id } = request.params;
        try {
            const company = await prisma_1.prisma.company.findUnique({
                where: { id },
            });
            if (!company) {
                return reply.status(404).send({ error: "Empresa não encontrada" });
            }
            return reply.status(200).send(company);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar empresa" });
        }
    }
}
exports.GetCompanyWhereIdController = GetCompanyWhereIdController;
