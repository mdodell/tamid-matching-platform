import 'reflect-metadata';
import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/app.setup.js';
import { PrismaService } from '../src/database/prisma.service.js';

async function createApp(dbUp: boolean) {
  const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
    .overrideProvider(PrismaService)
    .useValue({ ping: async () => dbUp })
    .compile();
  const app = moduleRef.createNestApplication();
  configureApp(app);
  await app.init();
  return app;
}

describe('GET /health', () => {
  let up: INestApplication;
  let down: INestApplication;

  beforeAll(async () => {
    up = await createApp(true);
    down = await createApp(false);
  });
  afterAll(async () => {
    await up.close();
    await down.close();
  });

  it('returns 200 when the database is reachable', async () => {
    const res = await request(up.getHttpServer()).get('/health').expect(200);
    expect(res.body).toEqual({ status: 'ok', checks: { database: 'up' } });
  });

  it('returns 503 when the database is unreachable', async () => {
    await request(down.getHttpServer()).get('/health').expect(503);
  });

  it('sends CORS headers for the web origin', async () => {
    const res = await request(up.getHttpServer())
      .get('/health')
      .set('Origin', 'http://localhost:3000');
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });
});
