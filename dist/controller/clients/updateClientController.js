"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientController = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = require("../../utils/prisma");
class UpdateClientController {
    async handle(request, reply) {
        const { id } = request.params;
        const { name, email, phone, address, password } = request.body;
        try {
            let dataToUpdate = {};
            if (name)
                dataToUpdate.name = name;
            if (email)
                dataToUpdate.email = email;
            if (phone)
                dataToUpdate.phone = phone;
            if (address)
                dataToUpdate.address = address;
            if (password) {
                const hash_password = await (0, bcryptjs_1.hash)(password, 8);
                dataToUpdate.password = hash_password;
            }
            const updatedClient = await prisma_1.prisma.client.update({
                where: { id },
                data: dataToUpdate,
            });
            const { password: _, ...clientWithoutPassword } = updatedClient;
            return reply.status(200).send(clientWithoutPassword);
        }
        catch (error) {
            reply.status(500).send({ error: "Erro ao atualizar cliente" });
        }
    }
}
exports.UpdateClientController = UpdateClientController;
