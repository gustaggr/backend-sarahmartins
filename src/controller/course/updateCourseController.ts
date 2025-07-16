import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class UpdateCourseController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const { name, description, price, type, link, status } = request.body as {
            name: string;
            description: string;
            price?: string;
            type: string;
            link?: string;
            status: string;
        };

        try {
            const updatedCourse = await prisma.course.update({
                where: { id },
                data: { name, description, price, type, link, status },
            });
            return reply.status(200).send(updatedCourse);
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao atualizar curso" });
        }
    }
}