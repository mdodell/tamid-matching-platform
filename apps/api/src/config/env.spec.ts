import { describe, expect, it } from 'vitest';
import { envFilePath, validateEnv } from './env.js';

describe('validateEnv', () => {
  it('applies defaults and coerces PORT', () => {
    const env = validateEnv({ DATABASE_URL: 'postgresql://x', PORT: '4000' });
    expect(env.PORT).toBe(4000);
    expect(env.WEB_ORIGIN).toBe('http://localhost:3000');
  });

  it('fails fast when DATABASE_URL is missing', () => {
    expect(() => validateEnv({})).toThrow(/DATABASE_URL/);
  });

  it('rejects an invalid WEB_ORIGIN', () => {
    expect(() => validateEnv({ DATABASE_URL: 'x', WEB_ORIGIN: 'nope' })).toThrow(/WEB_ORIGIN/);
  });
});

describe('envFilePath', () => {
  it('loads .env.local in development, and when NODE_ENV is unset', () => {
    expect(envFilePath('development')).toBe('.env.local');
    expect(envFilePath(undefined)).toBe('.env.local');
  });

  it('loads .env.test in test', () => {
    expect(envFilePath('test')).toBe('.env.test');
  });

  it('loads no file in production', () => {
    expect(envFilePath('production')).toBeUndefined();
  });
});
