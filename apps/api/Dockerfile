# Build from the repo root: docker build -f apps/api/Dockerfile .
FROM node:24-slim
RUN corepack enable
WORKDIR /repo

# Install first so this layer is cached until a manifest or the lockfile changes.
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/
RUN pnpm install --frozen-lockfile --filter @tamid/api...

COPY tsconfig.base.json ./
COPY apps/api apps/api
RUN pnpm --filter @tamid/api build

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "apps/api/dist/main.js"]
