"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCompanyController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetCompanyController {
    async index(request, reply) {
        try {
            const companies = await prisma_1.prisma.company.findMany();
            return reply.status(200).send(companies);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar empresas" });
        }
    }
}
exports.GetCompanyController = GetCompanyController;
