"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCourseController = void 0;
const prisma_1 = require("../../utils/prisma");
class CreateCourseController {
    async store(request, reply) {
        const { name, description, price, type, link, status, forecast } = request.body;
        try {
            if (!name || !description || !type || !status) {
                return reply.status(400).send({ error: "Os campos obrigatórios são: name, description, type e status" });
            }
            const courseExists = await prisma_1.prisma.course.findFirst({ where: { name } });
            if (courseExists) {
                return reply.status(400).send({ error: "Curso já existe" });
            }
            const course = await prisma_1.prisma.course.create({
                data: {
                    name,
                    description,
                    price,
                    type,
                    link,
                    forecast,
                    status,
                },
            });
            reply.status(201).send(course);
        }
        catch (error) {
            reply.status(500).send({ error: "Erro ao criar curso: " + error });
        }
    }
}
exports.CreateCourseController = CreateCourseController;
