# Testes da API PetShop Backend

## URLs de Teste
- **Local**: http://localhost:80
- **Health Check**: http://localhost:80/health
- **Ping**: http://localhost:80/ping

## 1. Health Check (Público)
```bash
curl http://localhost:80/health
```

## 2. Ping (Público)
```bash
curl http://localhost:80/ping
```

## 3. Criar Usuário (Protegido - precisa de MASTER_KEY)
```bash
curl -X POST http://localhost:80/register \
  -H "Content-Type: application/json" \
  -H "x-master-key: YOUR_MASTER_KEY" \
  -d '{
    "name": "Admin Teste",
    "email": "admin@teste.com",
    "password": "123456",
    "role": "ADMIN"
  }'
```

## 4. Login de Usuário (Público)
```bash
curl -X POST http://localhost:80/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@teste.com",
    "password": "123456"
  }' \
  -c cookies.txt
```

## 5. Verificar Token (Público - usa cookies)
```bash
curl http://localhost:80/me \
  -b cookies.txt
```

## 6. Listar Usuários (Protegido)
```bash
curl http://localhost:80/user \
  -H "x-master-key: YOUR_MASTER_KEY"
```

## 7. Criar Cliente (Protegido)
```bash
curl -X POST http://localhost:80/client \
  -H "Content-Type: application/json" \
  -H "x-master-key: YOUR_MASTER_KEY" \
  -d '{
    "name": "Cliente Teste",
    "email": "cliente@teste.com",
    "phone": "11999999999",
    "password": "123456",
    "address": "Rua Teste, 123"
  }'
```

## 8. Listar Clientes (Protegido)
```bash
curl http://localhost:80/client \
  -H "x-master-key: YOUR_MASTER_KEY"
```

## Usando PowerShell (Windows)

### Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:80/health" -Method Get
```

### Ping
```powershell
Invoke-RestMethod -Uri "http://localhost:80/ping" -Method Get
```

### Login
```powershell
$body = @{
    email = "admin@teste.com"
    password = "123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:80/login" -Method Post -Body $body -ContentType "application/json"
```

## Testando com Postman/Insomnia

### 1. Health Check
- **GET** `http://localhost:80/health`
- **Headers**: Nenhum necessário

### 2. Criar Usuário
- **POST** `http://localhost:80/register`
- **Headers**: 
  - `Content-Type: application/json`
  - `x-master-key: YOUR_MASTER_KEY`
- **Body**:
```json
{
  "name": "Admin Teste",
  "email": "admin@teste.com", 
  "password": "123456",
  "role": "ADMIN"
}
```

### 3. Login
- **POST** `http://localhost:80/login`
- **Headers**: `Content-Type: application/json`
- **Body**:
```json
{
  "email": "admin@teste.com",
  "password": "123456"
}
```

## Variáveis de Ambiente Necessárias

Certifique-se que seu `.env` tem:
```env
DATABASE_URL="sua_url_do_banco"
JWT_SECRET="sua_chave_jwt"
MASTER_KEY="sua_master_key"
COOKIE_SECRET="sua_cookie_secret"
PORT=80
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
```

## Códigos de Resposta Esperados

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Dados inválidos
- **401**: Não autorizado (MASTER_KEY inválida ou sessão inválida)
- **404**: Não encontrado
- **500**: Erro interno do servidor
