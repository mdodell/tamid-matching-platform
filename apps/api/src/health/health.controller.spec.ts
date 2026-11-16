import { ServiceUnavailableException } from '@nestjs/common';
import { describe, expect, it } from 'vitest';
import type { DatabaseService } from '../database/database.service.js';
import { HealthController } from './health.controller.js';

const controllerWith = (up: boolean) =>
  new HealthController({ ping: async () => up } as unknown as DatabaseService);

describe('HealthController', () => {
  it('reports ok when the database is up', async () => {
    await expect(controllerWith(true).check()).resolves.toEqual({
      status: 'ok',
      checks: { database: 'up' },
    });
  });

  it('throws 503 when the database is down', async () => {
    await expect(controllerWith(false).check()).rejects.toBeInstanceOf(ServiceUnavailableException);
  });
});
