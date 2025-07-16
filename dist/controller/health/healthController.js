"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthController = void 0;
const config_1 = require("../../config");
class HealthController {
    async check(request, reply) {
        try {
            // Verificação básica de saúde do servidor
            const uptime = process.uptime();
            const timestamp = new Date().toISOString();
            return reply.status(200).send({
                status: 'OK',
                uptime: Math.floor(uptime),
                timestamp,
                environment: config_1.CONFIG.NODE_ENV,
                version: process.env.npm_package_version || '1.0.0'
            });
        }
        catch (error) {
            return reply.status(500).send({
                status: 'ERROR',
                error: 'Health check failed'
            });
        }
    }
}
exports.HealthController = HealthController;
