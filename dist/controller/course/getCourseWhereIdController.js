"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCourseWhereIdController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetCourseWhereIdController {
    async show(request, reply) {
        const { id } = request.params;
        try {
            const course = await prisma_1.prisma.course.findUnique({
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
        }
        catch {
            return reply.status(500).send({ error: "Erro ao buscar curso" });
        }
    }
}
exports.GetCourseWhereIdController = GetCourseWhereIdController;
