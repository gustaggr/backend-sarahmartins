import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetCourseController {
    async index(request: FastifyRequest, reply: FastifyReply) {
        try {
            const courses = await prisma.course.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    type: true,
                    link: true,
                    forecast: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return reply.status(200).send(courses);
        } catch {
            return reply.status(500).send({ error: "Erro ao buscar cursos" });
        }
    }
}
