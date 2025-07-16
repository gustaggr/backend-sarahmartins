"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserController = void 0;
const prisma_1 = require("../../utils/prisma");
class GetUserController {
    async index(request, reply) {
        const users = await prisma_1.prisma.user.findMany();
        return reply.status(200).send(users);
    }
}
exports.GetUserController = GetUserController;
