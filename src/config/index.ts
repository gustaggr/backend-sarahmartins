// ✅ Configuração centralizada - sem dependência do arquivo .env
export const CONFIG = {
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
  ].filter(Boolean) as string[]
};

// Log da configuração (sem expor valores sensíveis)
console.log('🔧 Configuração do servidor:', {
  NODE_ENV: CONFIG.NODE_ENV,
  PORT: CONFIG.PORT,
  FRONTEND_URLS: CONFIG.FRONTEND_URLS,
  HAS_DATABASE_URL: !!CONFIG.DATABASE_URL,
  HAS_JWT_SECRET: !!CONFIG.JWT_SECRET,
  HAS_MASTER_KEY: !!CONFIG.MASTER_KEY
});

// Validação de variáveis críticas apenas em produção
if (CONFIG.NODE_ENV === 'production') {
  const missingVars = [];
  if (!CONFIG.DATABASE_URL) missingVars.push('DATABASE_URL');
  if (!CONFIG.JWT_SECRET || CONFIG.JWT_SECRET === 'default_jwt_secret_dev_only') missingVars.push('JWT_SECRET');
  if (!CONFIG.MASTER_KEY || CONFIG.MASTER_KEY === 'default_master_key_dev_only') missingVars.push('MASTER_KEY');
  
  if (missingVars.length > 0) {
    console.error(`❌ Erro: Variáveis de ambiente obrigatórias não configuradas: ${missingVars.join(', ')}`);
    process.exit(1);
  }
}
