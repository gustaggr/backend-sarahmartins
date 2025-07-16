"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
// ✅ Configuração centralizada - sem dependência do arquivo .env
exports.CONFIG = {
    // Banco de dados
    DATABASE_URL: process.env.DATABASE_URL || '',
    // Autenticação
    JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret_dev_only',
    MASTER_KEY: process.env.MASTER_KEY || 'default_master_key_dev_only',
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'default_cookie_secret_dev_only',
    // Servidor
    PORT: Number(process.env.PORT) || 80,
    NODE_ENV: process.env.NODE_ENV || 'development',
    // CORS
    FRONTEND_URLS: [
        process.env.FRONTEND_URL,
        'https://painel.mundoanimalcoro.shop',
        'http://localhost:3000',
        'http://localhost:5173'
    ].filter(Boolean)
};
// Log da configuração (sem expor valores sensíveis)
console.log('🔧 Configuração do servidor:', {
    NODE_ENV: exports.CONFIG.NODE_ENV,
    PORT: exports.CONFIG.PORT,
    FRONTEND_URLS: exports.CONFIG.FRONTEND_URLS,
    HAS_DATABASE_URL: !!exports.CONFIG.DATABASE_URL,
    HAS_JWT_SECRET: !!exports.CONFIG.JWT_SECRET,
    HAS_MASTER_KEY: !!exports.CONFIG.MASTER_KEY
});
// Validação de variáveis críticas apenas em produção
if (exports.CONFIG.NODE_ENV === 'production') {
    const missingVars = [];
    if (!exports.CONFIG.DATABASE_URL)
        missingVars.push('DATABASE_URL');
    if (!exports.CONFIG.JWT_SECRET || exports.CONFIG.JWT_SECRET === 'default_jwt_secret_dev_only')
        missingVars.push('JWT_SECRET');
    if (!exports.CONFIG.MASTER_KEY || exports.CONFIG.MASTER_KEY === 'default_master_key_dev_only')
        missingVars.push('MASTER_KEY');
    if (missingVars.length > 0) {
        console.error(`❌ Erro: Variáveis de ambiente obrigatórias não configuradas: ${missingVars.join(', ')}`);
        process.exit(1);
    }
}
