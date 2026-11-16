import { describe, expect, it } from 'vitest';
import { validateEnv } from './env.js';

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
