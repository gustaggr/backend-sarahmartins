# Etapa 1: Build com Node.js e todas as dependências
FROM node:20 AS builder

# Build args usados por CapRover (opcional)
ARG CAPROVER_GIT_COMMIT_SHA
ARG DATABASE_URL
ARG FRONTEND_URL
ARG JWT_SECRET
ARG NODE_ENV
ARG PORT

WORKDIR /app

# Copiar os arquivos de dependência explicitamente (evita falha com *)
COPY package.json package-lock.json ./

# Instalar TODAS as dependências (inclusive dev)
RUN npm ci

# Copiar o restante da aplicação
COPY . .

# Verificar se os tipos do nodemailer estão presentes (debug opcional)
RUN ls -la node_modules/ | head -10
RUN ls -la node_modules/@types/ || echo "Pasta @types não existe"
RUN ls -la node_modules/@types/nodemailer
# Gerar o cliente do Prisma
RUN npm run prisma:generate

# Compilar TypeScript
RUN npm run build

# Remover devDependencies após o build
RUN npm prune --production

# Etapa 2: container final e enxuto
FROM node:20-slim

# Instalar ferramentas necessárias para healthcheck
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar apenas o necessário da etapa anterior
COPY --from=builder /app/package.json ./ 
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Variáveis padrão (podem ser sobrescritas via CapRover)
ENV NODE_ENV=production
ENV PORT=80

# Expor a porta
EXPOSE 80

# Healthcheck para CapRover
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Comando final
CMD ["node", "dist/server.js"]
