import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetClientController {
    async index(request: FastifyRequest, reply: FastifyReply) {
        const client = await prisma.client.findMany();
        reply.status(200).send(client);
    }
}