"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIdPetController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetIdPetController {
    async handle(request, reply) {
        const id = request.params?.id;
        if (!id)
            return reply.status(400).send({ error: "ID do pet é obrigatório" });
        try {
            const pet = await prisma_1.prisma.pet.findUnique({
                where: { id },
                include: { client: true }
            });
            if (!pet)
                return reply.status(404).send({ error: "Pet não encontrado" });
            return reply.send(pet);
        }
        catch {
            return reply.status(500).send({ error: "Erro ao buscar pet" });
        }
    }
}
exports.GetIdPetController = GetIdPetController;
