import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetUserController {
    async index(request: FastifyRequest, reply: FastifyReply) {
        const users = await prisma.user.findMany();
        return reply.status(200).send(users);
    }
}