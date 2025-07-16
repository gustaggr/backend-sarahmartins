"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCourseController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeleteCourseController {
    async handle(request, reply) {
        const { id } = request.params;
        try {
            const deletedCourse = await prisma_1.prisma.course.delete({
                where: { id },
            });
            return reply.status(200).send(deletedCourse);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar curso" });
        }
    }
}
exports.DeleteCourseController = DeleteCourseController;
