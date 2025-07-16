#!/bin/bash

# Script de teste para CapRover Deploy
# Substitua SEU_DOMINIO pela URL da sua aplicação

DOMAIN="https://sua-app.sua-caprover-domain.com"

echo "🧪 Testando Deploy do PetShop Backend no CapRover..."
echo "Domain: $DOMAIN"
echo ""

# Test 1: Health Check
echo "1️⃣ Testando Health Check..."
HEALTH_RESPONSE=$(curl -s -w "HTTP_CODE:%{http_code}" "$DOMAIN/health")
HTTP_CODE=$(echo $HEALTH_RESPONSE | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
RESPONSE_BODY=$(echo $HEALTH_RESPONSE | sed 's/HTTP_CODE:[0-9]*$//')

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Health Check OK"
    echo "Response: $RESPONSE_BODY"
else
    echo "❌ Health Check FAILED (HTTP $HTTP_CODE)"
    echo "Response: $RESPONSE_BODY"
fi
echo ""

# Test 2: Ping
echo "2️⃣ Testando Ping..."
PING_RESPONSE=$(curl -s -w "HTTP_CODE:%{http_code}" "$DOMAIN/ping")
HTTP_CODE=$(echo $PING_RESPONSE | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
RESPONSE_BODY=$(echo $PING_RESPONSE | sed 's/HTTP_CODE:[0-9]*$//')

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Ping OK"
    echo "Response: $RESPONSE_BODY"
else
    echo "❌ Ping FAILED (HTTP $HTTP_CODE)"
    echo "Response: $RESPONSE_BODY"
fi
echo ""

# Test 3: API Endpoints (GET requests only)
echo "3️⃣ Testando Endpoints Protegidos (devem retornar 401)..."

endpoints=("/user" "/client" "/pet" "/category" "/product" "/service" "/statics")

for endpoint in "${endpoints[@]}"; do
    echo "Testing $endpoint..."
    RESPONSE=$(curl -s -w "HTTP_CODE:%{http_code}" "$DOMAIN$endpoint")
    HTTP_CODE=$(echo $RESPONSE | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
    
    if [ "$HTTP_CODE" = "401" ]; then
        echo "✅ $endpoint correctly protected (401)"
    else
        echo "⚠️ $endpoint returned HTTP $HTTP_CODE (expected 401)"
    fi
done

echo ""
echo "🎉 Teste completo!"
echo ""
echo "📋 Próximos passos:"
echo "1. Se health e ping estão OK, o deploy funcionou!"
echo "2. Configure as variáveis de ambiente no CapRover"
echo "3. Execute as migrações do banco: npm run prisma:deploy"
echo "4. Teste com um cliente REST (Postman, Insomnia, etc.)"
