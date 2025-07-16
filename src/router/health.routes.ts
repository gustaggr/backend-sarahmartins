import { FastifyInstance } from 'fastify';
import { HealthController } from '../controller/health/healthController';

export async function healthRoutes(app: FastifyInstance) {
  const health = new HealthController();
  
  // Rota pública para health check
  app.get('/health', health.check.bind(health));
}
