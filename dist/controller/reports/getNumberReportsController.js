"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNumberReportController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetNumberReportController {
    async handle(request, reply) {
        const numberParam = request.params?.number;
        // Check if number is present and is a valid number
        const number = Number(numberParam);
        if (!numberParam || isNaN(number)) {
            return reply.status(400).send({ error: "Número do relatório é obrigatório e deve ser um número válido" });
        }
        try {
            const reports = await prisma_1.prisma.reports.findUnique({
                where: { number },
                include: {
                    pet: {
                        include: {
                            client: true,
                        },
                    },
                    user: true,
                },
            });
            return reply.status(200).send(reports);
        }
        catch (error) {
            return reply.status(400).send({ error: "Falha ao obter relatórios", details: error });
        }
    }
}
exports.GetNumberReportController = GetNumberReportController;
