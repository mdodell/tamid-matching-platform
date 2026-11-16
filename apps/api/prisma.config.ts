import { defineConfig } from 'prisma/config';

// Prisma does not load env files itself. Locally the URL comes from .env.local;
// in CI and on Render it is a real environment variable.
try {
  process.loadEnvFile('.env.local');
} catch {
  // No env file: rely on the process environment.
}

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations', seed: 'tsx prisma/seed.ts' },
  datasource: { url: process.env.DATABASE_URL ?? '' },
});
