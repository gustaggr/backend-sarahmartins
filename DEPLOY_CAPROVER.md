# Deploy no CapRover - PetShop Backend

## 📋 Pré-requisitos

1. **CapRover instalado e configurado**
2. **PostgreSQL** configurado (pode ser via CapRover One-Click Apps)

## 🚀 Steps para Deploy

### 1. Configurar PostgreSQL (se necessário)
```bash
# No CapRover, vá em One-Click Apps e instale PostgreSQL
# Anote as credenciais: host, porta, usuário, senha, database
```

### 2. Configurar Variáveis de Ambiente no CapRover

No painel do CapRover, na aba **App Configs**, adicione estas variáveis:

```env
NODE_ENV=production
PORT=80
DATABASE_URL=postgresql://usuario:senha@srv-captain--postgres:5432/petshop_db
JWT_SECRET=seu-jwt-secret-super-seguro-aqui
MASTER_KEY=sua-master-key-super-segura-aqui
COOKIE_SECRET=seu-cookie-secret-super-seguro-aqui
FRONTEND_URL=https://seu-frontend-domain.com
```

### 3. Deploy via Git ou Upload

#### Opção A: Via Git (Recomendado)
```bash
# Configure o repositório no CapRover
# Push para o branch configurado irá fazer deploy automático
```

#### Opção B: Via Upload Manual
```bash
# Crie um tar.gz do projeto
tar -czf petshop-backend.tar.gz .
# Upload via interface do CapRover
```

### 4. Configurar Health Check

- **Container HTTP Port**: `3000`

### 5. Executar Migrações (Primeira vez)

Após o primeiro deploy, execute as migrações via Terminal do CapRover:

```bash
# No terminal do container
npm run prisma:deploy
```

## 🔍 Testar o Deploy

### URLs para testar:
- **Health Check**: `https://sua-app.sua-caprover-domain.com/health`
- **Ping**: `https://sua-app.sua-caprover-domain.com/ping`
- **Login**: `POST https://sua-app.sua-caprover-domain.com/login`

### Comando de teste:
```bash
curl https://sua-app.sua-caprover-domain.com/health
```

Resposta esperada:
```json
{
  "status": "OK",
  "uptime": 120,
  "timestamp": "2025-07-03T...",
  "environment": "production",
  "version": "1.0.0"
}
```

## ⚙️ Configurações do CapRover

### HTTP Settings
- **Container HTTP Port**: `80`
- **Force HTTPS**: `✅ Habilitado`
- **HTTP Basic Auth**: `❌ Desabilitado` (API backend)

### App Configs
- **Instance Count**: `1` (pode aumentar para mais instâncias)
- **Captain Definition Path**: `./captain-definition`

## 🔧 Troubleshooting

### Se o build falhar:
1. Verifique se as variáveis de ambiente estão configuradas
2. Verifique os logs de build no CapRover
3. Certifique-se que o PostgreSQL está rodando

### Se a aplicação não responder:
1. Verifique se a porta está configurada como `80`
2. Teste o health check: `/health`
3. Verifique os logs da aplicação no CapRover

### Para verificar logs:
```bash
# No terminal do CapRover container
docker logs <container-name> --tail 100 -f
```
