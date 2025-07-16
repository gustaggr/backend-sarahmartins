"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPetController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetPetController {
    async handle(request, reply) {
        try {
            const pets = await prisma_1.prisma.pet.findMany({
                include: {
                    client: true,
                    reprots: true, // Certifique-se de que esse é o nome correto
                    _count: {
                        select: {
                            reprots: true
                        }
                    }
                }
            });
            // Remove _count e adiciona numeroReports
            const formattedPets = pets.map(({ _count, ...rest }) => ({
                ...rest,
                numeroReports: _count.reprots
            }));
            return reply.status(200).send(formattedPets);
        }
        catch (error) {
            return reply.status(500).send({ error: "Erro ao buscar pet" });
        }
    }
}
exports.GetPetController = GetPetController;
