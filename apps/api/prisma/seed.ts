import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

// Seed scaffold: add idempotent upserts here as models are introduced.
const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

try {
  console.log('Seed: nothing to seed yet.');
} finally {
  await prisma.$disconnect();
}
