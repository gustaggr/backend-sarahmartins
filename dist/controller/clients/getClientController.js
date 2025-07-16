"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClientController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetClientController {
    async index(request, reply) {
        const client = await prisma_1.prisma.client.findMany();
        reply.status(200).send(client);
    }
}
exports.GetClientController = GetClientController;
