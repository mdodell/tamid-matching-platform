# Build from the repo root: docker build -f apps/web/Dockerfile .
FROM node:24-slim
RUN corepack enable
WORKDIR /repo

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
COPY packages/shared/package.json packages/shared/
RUN pnpm install --frozen-lockfile --filter @tamid/web...

COPY tsconfig.base.json ./
COPY apps/web apps/web
RUN pnpm --filter @tamid/web build

EXPOSE 3000
CMD ["pnpm", "--filter", "@tamid/web", "exec", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
