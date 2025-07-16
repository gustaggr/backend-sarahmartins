"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePetController = void 0;
const prisma_1 = require("../../utils/prisma");
class UpdatePetController {
    async handle(request, reply) {
        const { id } = request.params;
        const { name, species, carrying, breed, age, weight, sex, clientId } = request.body;
        try {
            // Remove undefined fields to avoid overwriting with undefined
            const updateData = {};
            if (name !== undefined)
                updateData.name = name;
            if (species !== undefined)
                updateData.species = species;
            if (carrying !== undefined)
                updateData.carrying = carrying;
            if (breed !== undefined)
                updateData.breed = breed;
            if (age !== undefined)
                updateData.age = age;
            if (weight !== undefined)
                updateData.weight = weight;
            if (sex !== undefined)
                updateData.sex = sex;
            if (clientId !== undefined)
                updateData.clientId = clientId;
            const updatedPet = await prisma_1.prisma.pet.update({
                where: { id },
                data: updateData,
            });
            return reply.status(200).send(updatedPet);
        }
        catch (error) {
            return reply.status(400).send({ error: "Falha ao atualizar pet", details: error });
        }
    }
}
exports.UpdatePetController = UpdatePetController;
