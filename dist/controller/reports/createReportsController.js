"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReportsController = void 0;
const prisma_1 = require("../../utils/prisma");
async function generateUniqueNumber() {
    let unique = false;
    let number = 0;
    while (!unique) {
        number = Math.floor(10000 + Math.random() * 90000);
        const exists = await prisma_1.prisma.reports.findUnique({
            where: { number },
        });
        if (!exists) {
            unique = true;
        }
    }
    return number;
}
class CreateReportsController {
    async store(request, reply) {
        let { title, diagnosis, treatment, medications, remarks, petId, userId } = request.body;
        const number = await generateUniqueNumber();
        try {
            const newReport = await prisma_1.prisma.reports.create({
                data: {
                    number,
                    title,
                    diagnosis,
                    treatment,
                    medications,
                    remarks,
                    petId,
                    userId
                },
            });
            return reply.status(201).send(newReport);
        }
        catch (error) {
            return reply.status(400).send({ error: "Falha ao criar relatório", details: error });
        }
    }
}
exports.CreateReportsController = CreateReportsController;
