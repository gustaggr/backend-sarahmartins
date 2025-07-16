"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVeterinariansController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetVeterinariansController {
    async handle(request, reply) {
        const users = await prisma_1.prisma.user.findMany({
            where: {
                role: "VETERINARIO"
            }
        });
        return reply.status(200).send(users);
    }
}
exports.GetVeterinariansController = GetVeterinariansController;
