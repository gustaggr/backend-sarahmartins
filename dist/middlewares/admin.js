"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminOrMasterKeyMiddleware = AdminOrMasterKeyMiddleware;
const config_1 = require("../config");
function AdminOrMasterKeyMiddleware(request, reply, next) {
    const masterKey = request.headers['x-master-key'];
    // Remover log em produção por segurança
    if (config_1.CONFIG.NODE_ENV !== 'production') {
        console.log('MASTER KEY HEADER:', masterKey);
    }
    if (masterKey === config_1.CONFIG.MASTER_KEY) {
        return next();
    }
    return reply.status(401).send({ message: 'Chave de acesso inválida ou não fornecida.' });
}
