"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetReportsController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetReportsController {
    async handle(request, reply) {
        const reports = await prisma_1.prisma.reports.findMany();
        return reply.status(200).send(reports);
    }
}
exports.GetReportsController = GetReportsController;
