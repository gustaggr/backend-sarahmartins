import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../utils/prisma";

export class GetContentsController {
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

            const faqs = await prisma.faq.findMany({
                select: {
                    id: true,
                    question: true,
                    answer: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            const products = await prisma.product.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    type: true,
                    link: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            return reply.status(200).send({
                message: "Aqui estão os dados:",
                faqs: {
                    title: "Aqui estão as FAQs",
                    data: faqs
                },
                courses: {
                    title: "Aqui estão os Cursos",
                    data: courses
                },
                products: {
                    title: "Aqui estão os Produtos",
                    data: products
                }
            });
        } catch {
            return reply.status(500).send({ error: "Erro ao buscar os dados" });
        }
    }
}
