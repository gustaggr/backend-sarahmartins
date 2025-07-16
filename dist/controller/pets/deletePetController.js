"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePetController = void 0;
const prisma_1 = require("../../utils/prisma");
class DeletePetController {
    async handle(request, reply) {
        const { id } = request.params;
        if (!id) {
            return reply.status(400).send({ error: "ID do pet não fornecido" });
        }
        try {
            // Delete related reports first to avoid foreign key constraint violation
            await prisma_1.prisma.reports.deleteMany({
                where: { petId: id },
            });
            const deletedPet = await prisma_1.prisma.pet.delete({
                where: { id },
            });
            return reply.status(200).send(deletedPet);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao deletar pet: " + error });
        }
    }
}
exports.DeletePetController = DeletePetController;
