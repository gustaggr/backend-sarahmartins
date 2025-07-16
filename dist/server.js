"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("./router/routes");
const cors_1 = __importDefault(require("@fastify/cors"));
const cookie_1 = __importDefault(require("@fastify/cookie"));
const config_1 = require("./config");
const app = (0, fastify_1.default)({
    logger: config_1.CONFIG.NODE_ENV === 'production' ? true : false // Logs estruturados em produção
});
// Tratamento global de erros
app.setErrorHandler(async (error, request, reply) => {
    const isProduction = config_1.CONFIG.NODE_ENV === 'production';
    // Log do erro (estruturado em produção)
    if (isProduction) {
        request.log.error(error);
    }
    else {
        console.error('Erro capturado:', error);
    }
    // Resposta de erro sanitizada para produção
    if (isProduction) {
        return reply.status(500).send({
            message: 'Erro interno do servidor',
            statusCode: 500
        });
    }
    else {
        return reply.status(500).send({
            message: error.message,
            statusCode: 500,
            stack: error.stack
        });
    }
});
// ✅ Registra o plugin de cookies antes das rotas
app.register(cookie_1.default, {
    secret: config_1.CONFIG.COOKIE_SECRET,
});
// Configuração do CORS
app.register(cors_1.default, {
    origin: config_1.CONFIG.FRONTEND_URLS,
    credentials: true, // necessário para enviar cookies entre frontend e backend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});
// Rotas da aplicação
app.register(routes_1.router);
app.listen({ port: config_1.CONFIG.PORT, host: '0.0.0.0' })
    .then(() => {
    console.log(`🚀 Server iniciado na porta ${config_1.CONFIG.PORT} (${config_1.CONFIG.NODE_ENV})`);
})
    .catch((err) => {
    console.error("❌ Erro ao iniciar o servidor:", err);
    process.exit(1);
});
