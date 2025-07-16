# Etapa 1: build com Node.js
FROM node:20 AS builder

# Aceitar build args do CapRover (elimina warnings)
ARG CAPROVER_GIT_COMMIT_SHA
ARG DATABASE_URL
ARG FRONTEND_URL
ARG JWT_SECRET
ARG NODE_ENV
ARG PORT

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera cliente Prisma e compila TypeScript
RUN npm run prisma:generate
RUN npm run build

# Remove devDependencies após o build
RUN npm prune --production

# Etapa 2: container final e enxuto
FROM node:20-slim

# Instalar dependências necessárias
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copia apenas o necessário do build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Configurações padrão (podem ser sobrescritas pelas env vars do CapRover)
ENV NODE_ENV=production
ENV PORT=80

# Exponha a porta do Fastify
EXPOSE 80

# Health check para CapRover
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Inicia o servidor
CMD ["node", "dist/server.js"]

# Inicia o servidor
CMD ["node", "dist/server.js"]
