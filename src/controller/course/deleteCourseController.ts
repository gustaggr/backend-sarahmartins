import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class DeleteCourseController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        try {
            const deletedCourse = await prisma.course.delete({
                where: { id },
            });
            return reply.status(200).send(deletedCourse);
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar curso" });
        }
    }
}