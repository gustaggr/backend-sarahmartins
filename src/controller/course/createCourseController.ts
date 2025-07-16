import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class CreateCourseController {
    async store(request: FastifyRequest, reply: FastifyReply) {
        const { name, description, price, type, link, status, forecast } = request.body as {
            name: string;
            description: string;
            price?: string;
            type: string;
            link?: string;
            forecast?: string;
            status: string;
        };

        try {
            if (!name || !description || !type || !status) {
                return reply.status(400).send({ error: "Os campos obrigatórios são: name, description, type e status" });
            }

            const courseExists = await prisma.course.findFirst({ where: { name } });
            if (courseExists) {
                return reply.status(400).send({ error: "Curso já existe" });
            }

            const course = await prisma.course.create({
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
        } catch (error) {
            reply.status(500).send({ error: "Erro ao criar curso: " + error });
        }
    }
}