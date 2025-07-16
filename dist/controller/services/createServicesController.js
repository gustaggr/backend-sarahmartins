"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateServicesController = void 0;
const prisma_1 = require("../../utils/prisma");
class CreateServicesController {
    async store(request, reply) {
        const { name, price, description, duration, species } = request.body;
        try {
            const nameExists = await prisma_1.prisma.service.findUnique({
                where: { name },
            });
            if (nameExists) {
                return reply.status(400).send({ error: "Serviço já existe com esse nome" });
            }
            let service = await prisma_1.prisma.service.create({
                data: {
                    name,
                    price,
                    description,
                    duration,
                    species,
                },
            });
            return reply.status(201).send(service);
        }
        catch (error) {
            return reply.status(400).send({ error: "Falha ao criar serviço", details: error });
        }
    }
}
exports.CreateServicesController = CreateServicesController;
