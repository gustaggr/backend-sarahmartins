# PetShop Backend - Deploy em Produção

## 🚀 Preparação para Produção

### 1. Variáveis de Ambiente Obrigatórias

Crie um arquivo `.env` baseado no `.env.example` com as seguintes variáveis:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/petshop_db"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
MASTER_KEY="your-master-key-for-admin-access"
COOKIE_SECRET="your-cookie-secret-key"
PORT=80
NODE_ENV="production"
FRONTEND_URL="https://your-frontend-domain.com"
```

### 2. Build e Deploy

#### Usando Docker:

```bash
# Build da imagem
docker build -t petshop-backend .

# Executar
docker run -d \
  --name petshop-backend \
  -p 80:80 \
  --env-file .env \
  petshop-backend
```

#### Usando Docker Compose (Recomendado):

```bash
# Para produção com PostgreSQL incluído
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Health Checks

- **Health Check**: `GET /health`
- **Ping**: `GET /ping`

### 4. Migrações de Banco

```bash
# Aplicar migrações em produção
npm run prisma:deploy

# Verificar status das migrações
npm run prisma:status
```

### 5. Logs

Em produção, os logs são estruturados. Use ferramentas como:
- Docker logs: `docker logs petshop-backend`
- Para análise: ELK Stack, Grafana, etc.

## 🔒 Segurança

- ✅ CORS configurado por ambiente
- ✅ Logs sensíveis removidos em produção
- ✅ Container executando como usuário não-root
- ✅ Variáveis de ambiente validadas na inicialização
- ✅ Health checks configurados
- ✅ Tratamento global de erros

## 📊 Monitoramento

O endpoint `/health` retorna:
```json
{
  "status": "OK",
  "uptime": 3600,
  "timestamp": "2025-07-03T10:00:00.000Z",
  "environment": "production",
  "version": "1.0.0"
}
```
