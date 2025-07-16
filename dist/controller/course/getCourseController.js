"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetCourseController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetCourseController {
    async index(request, reply) {
        try {
            const courses = await prisma_1.prisma.course.findMany({
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
        }
        catch {
            return reply.status(500).send({ error: "Erro ao buscar cursos" });
        }
    }
}
exports.GetCourseController = GetCourseController;
