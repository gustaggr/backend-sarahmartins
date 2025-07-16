"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetServicesController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetServicesController {
    async index(request, reply) {
        try {
            const services = await prisma_1.prisma.service.findMany();
            return reply.status(200).send(services);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar serviços" });
        }
    }
}
exports.GetServicesController = GetServicesController;
