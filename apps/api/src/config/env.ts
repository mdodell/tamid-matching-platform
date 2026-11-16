import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(3001),
  WEB_ORIGIN: z.url().default('http://localhost:3000'),
  DATABASE_URL: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

/** Used by ConfigModule: fail fast on missing or invalid variables. */
export function validateEnv(config: Record<string, unknown>): Env {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    throw new Error(`Invalid environment variables:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

/**
 * Which env file to load for the current NODE_ENV. Production reads real
 * environment variables only (Render, Docker), so it loads no file.
 */
export function envFilePath(nodeEnv: string | undefined): string | undefined {
  switch (nodeEnv ?? 'development') {
    case 'development':
      return '.env.local';
    case 'test':
      return '.env.test';
    default:
      return undefined;
  }
}
