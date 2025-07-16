"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompanyController = void 0;
const prisma_1 = require("../../utils/prisma");
class CreateCompanyController {
    async store(request, reply) {
        const { nome, logo } = request.body;
        try {
            const nomeExists = await prisma_1.prisma.company.findFirst({
                where: { nome },
            });
            if (nomeExists) {
                return reply.status(400).send({ error: "Empresa já existe com esse nome" });
            }
            const company = await prisma_1.prisma.company.create({
                data: {
                    nome,
                    logo,
                },
            });
            return reply.status(201).send(company);
        }
        catch (error) {
            return reply.status(400).send({ error: "Falha ao criar empresa", details: error });
        }
    }
}
exports.CreateCompanyController = CreateCompanyController;
