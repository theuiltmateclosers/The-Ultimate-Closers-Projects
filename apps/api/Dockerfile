FROM node:20-alpine AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY apps ./apps
RUN npm i -g pnpm@9 && pnpm -C apps/api install --filter ./apps/api... --frozen-lockfile
RUN pnpm -C apps/api build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/api/dist ./dist
EXPOSE 4000
USER node
CMD ["node", "dist/main.js"]

