# Estágio de construção
FROM node:20-slim AS builder

WORKDIR /app

# Copia os arquivos de configuração
COPY package*.json ./
COPY tsconfig*.json ./
COPY next.config.js ./
COPY nodemon.json ./
COPY .env* ./

# Instala as dependências
RUN npm install

# Copia o código fonte
COPY . .

# Gera os tipos do Payload e faz o build completo
RUN npm run generate:types
RUN npm run build

# Estágio de produção
FROM node:20-slim AS runner

WORKDIR /app

# Copia os arquivos necessários do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src ./src
COPY --from=builder /app/.env* ./

# Expõe a porta que o servidor vai usar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start"]
