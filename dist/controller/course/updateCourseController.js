"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCourseController = void 0;
const prisma_1 = require("../../utils/prisma");
class UpdateCourseController {
    async handle(request, reply) {
        const { id } = request.params;
        const { name, description, price, type, link, status } = request.body;
        try {
            const updatedCourse = await prisma_1.prisma.course.update({
                where: { id },
                data: { name, description, price, type, link, status },
            });
            return reply.status(200).send(updatedCourse);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao atualizar curso" });
        }
    }
}
exports.UpdateCourseController = UpdateCourseController;
