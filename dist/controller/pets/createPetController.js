"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePetController = void 0;
const prisma_1 = require("../../utils/prisma");
class CreatePetController {
    async store(request, reply) {
        let { name, species, carrying, breed, age, weight, sex, clientId } = request.body;
        try {
            const newPet = await prisma_1.prisma.pet.create({
                data: {
                    name,
                    species,
                    carrying,
                    breed,
                    age,
                    weight,
                    sex,
                    clientId,
                },
            });
            return reply.status(201).send(newPet);
        }
        catch (error) {
            return reply.status(400).send({ error: "Falha ao criar pet", details: error });
        }
    }
}
exports.CreatePetController = CreatePetController;
