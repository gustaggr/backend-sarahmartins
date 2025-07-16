import 'fastify';

declare module 'fastify' {
    interface FastifyRequest {
        userId?: {
            id: string;
            email: string;
        };
    }
}