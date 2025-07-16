"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddlewares = AuthMiddlewares;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function AuthMiddlewares(request, reply, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return reply.status(401).send({ message: "Token não informado." });
    }
    const [, token] = authorization.split(" ");
    const jwtSecret = config_1.CONFIG.JWT_SECRET;
    if (!jwtSecret) {
        request.log.error("JWT_SECRET não definido.");
        return reply.status(500).send({ message: "Erro interno no servidor." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        request.userId = {
            id: decoded.id,
            email: decoded.email
        };
        next();
    }
    catch (error) {
        return reply.status(401).send({ message: "Token inválido." });
    }
}
