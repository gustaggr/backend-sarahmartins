import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetCourseWhereIdController {
    async show(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const course = await prisma.course.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    type: true,
                    link: true,
                    status: true,
                    forecast: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            if (!course) {
                return reply.status(404).send({ error: "Curso não encontrado" });
            }

            return reply.status(200).send(course);
        } catch {
            return reply.status(500).send({ error: "Erro ao buscar curso" });
        }
    }
}
