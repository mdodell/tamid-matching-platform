import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

// swc is needed for decorator metadata, which Nest's DI relies on.
const plugins = [swc.vite({ module: { type: 'es6' } })];

export default defineConfig({
  test: {
    projects: [
      { plugins, test: { name: 'unit', include: ['src/**/*.spec.ts'] } },
      {
        plugins,
        test: {
          name: 'e2e',
          include: ['test/**/*.e2e-spec.ts'],
          // The database is overridden in tests; this only satisfies env validation.
          env: { DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/unused' },
        },
      },
    ],
  },
});
