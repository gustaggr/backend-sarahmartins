# Etapa 1: Build com Node.js e todas as dependências
FROM node:20 AS builder

# Build args usados por CapRover
ARG CAPROVER_GIT_COMMIT_SHA
ARG DATABASE_URL
ARG FRONTEND_URL
ARG JWT_SECRET
ARG NODE_ENV
ARG PORT

WORKDIR /app

# Copiar arquivos de dependência
COPY package.json package-lock.json ./

# Instalar todas as dependências usando npm install
RUN npm install

# Copiar código fonte
COPY . .

# Gerar cliente Prisma
RUN npm run prisma:generate

# Compilar TypeScript
RUN npm run build

# Remover devDependencies para reduzir tamanho
RUN npm prune --production

# Etapa 2: Imagem final otimizada
FROM node:20-slim

# Instalar dependências do sistema para healthcheck
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

WORKDIR /app

# Copiar apenas arquivos necessários da etapa de build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Configurar ambiente de produção
ENV NODE_ENV=production
ENV PORT=80

# Expor porta
EXPOSE 80

# Healthcheck para CapRover
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/health || exit 1

# Comando de inicialização
CMD ["node", "dist/server.js"]