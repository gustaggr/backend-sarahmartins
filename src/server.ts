import fastify, { FastifyInstance } from "fastify";
import { router } from "./router/routes";
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import { CONFIG } from './config';

const app: FastifyInstance = fastify({
  logger: CONFIG.NODE_ENV === 'production' ? true : false // Logs estruturados em produção
});

// Tratamento global de erros
app.setErrorHandler(async (error, request, reply) => {
  const isProduction = CONFIG.NODE_ENV === 'production';
  
  // Log do erro (estruturado em produção)
  if (isProduction) {
    request.log.error(error);
  } else {
    console.error('Erro capturado:', error);
  }

  // Resposta de erro sanitizada para produção
  if (isProduction) {
    return reply.status(500).send({
      message: 'Erro interno do servidor',
      statusCode: 500
    });
  } else {
    return reply.status(500).send({
      message: error.message,
      statusCode: 500,
      stack: error.stack
    });
  }
});

// ✅ Registra o plugin de cookies antes das rotas
app.register(cookie, {
  secret: CONFIG.COOKIE_SECRET,
});

// Configuração do CORS
app.register(cors, {
  origin: CONFIG.FRONTEND_URLS,
  credentials: true, // necessário para enviar cookies entre frontend e backend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

// Rotas da aplicação
app.register(router);

app.listen({ port: CONFIG.PORT, host: '0.0.0.0' })
  .then(() => {
    console.log(`🚀 Server iniciado na porta ${CONFIG.PORT} (${CONFIG.NODE_ENV})`);
  })
  .catch((err) => {
    console.error("❌ Erro ao iniciar o servidor:", err);
    process.exit(1);
  });

