"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetStaticsController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetStaticsController {
    async handle(request, reply) {
        try {
            const totalClients = await prisma_1.prisma.client.count();
            const totalPets = await prisma_1.prisma.pet.count();
            const totalUsers = await prisma_1.prisma.user.count();
            return reply.status(200).send({
                totalClients,
                totalPets,
                totalUsers
            });
        }
        catch (error) {
            return reply.status(400).send({ error: "Falha ao obter estatísticas", details: error });
        }
    }
}
exports.GetStaticsController = GetStaticsController;
