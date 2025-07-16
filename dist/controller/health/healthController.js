"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const prisma_1 = require("../../utils/prisma");
class HealthController {
    async check(request, reply) {
        try {
            // Testa a conexão com o banco de dados
            await prisma_1.prisma.$queryRaw `SELECT 1`;
            return reply.status(200).send({
                status: 'OK',
                timestamp: new Date().toISOString(),
                service: 'Sarah Martins Backend',
                database: 'connected',
                uptime: process.uptime()
            });
        }
        catch (error) {
            return reply.status(503).send({
                status: 'ERROR',
                timestamp: new Date().toISOString(),
                service: 'Sarah Martins Backend',
                database: 'disconnected',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
exports.HealthController = HealthController;
