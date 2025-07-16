"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRoutes = healthRoutes;
const healthController_1 = require("../controller/health/healthController");
async function healthRoutes(app) {
    const health = new healthController_1.HealthController();
    // Rota pública para health check
    app.get('/health', health.check.bind(health));
    app.get('/ping', async (request, reply) => {
        return reply.status(200).send({ message: 'pong' });
    });
}
