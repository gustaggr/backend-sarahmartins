import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from '../../utils/prisma';

export class HealthController {
  async check(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Testa a conexão com o banco de dados
      await prisma.$queryRaw`SELECT 1`;
      
      return reply.status(200).send({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Sarah Martins Backend',
        database: 'connected',
        uptime: process.uptime()
      });
    } catch (error) {
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
