"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdPetClientController = void 0;
const prisma_1 = require("../../utils/prisma");
class getIdPetClientController {
    async handle(request, reply) {
        const clientId = request.params?.id;
        if (!clientId)
            return reply.status(400).send({ error: "ID do client é obrigatório" });
        try {
            const pets = await prisma_1.prisma.pet.findMany({
                where: { clientId },
                include: { client: true }
            });
            return reply.send(pets);
        }
        catch {
            return reply.status(500).send({ error: "Erro ao buscar pets" });
        }
    }
}
exports.getIdPetClientController = getIdPetClientController;
