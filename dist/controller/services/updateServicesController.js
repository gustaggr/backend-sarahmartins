"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateServiceConstroller = void 0;
const prisma_1 = require("../../utils/prisma");
class UpdateServiceConstroller {
    async handle(request, reply) {
        const { id } = request.params;
        const { name, price, description, duration, species } = request.body;
        const updateData = {
            ...(name !== undefined && { name }),
            ...(price !== undefined && { price }),
            ...(description !== undefined && { description }),
            ...(duration !== undefined && { duration }),
            ...(species !== undefined && { species }),
        };
        try {
            const updatedService = await prisma_1.prisma.service.update({
                where: { id },
                data: updateData,
            });
            return reply.status(200).send(updatedService);
        }
        catch (error) {
            return reply.status(500).send({ error: `Erro ao atualizar serviço: ${error}` });
        }
    }
}
exports.UpdateServiceConstroller = UpdateServiceConstroller;
