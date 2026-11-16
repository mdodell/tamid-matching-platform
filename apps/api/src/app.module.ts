import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envFilePath, validateEnv } from './config/env.js';
import { DatabaseModule } from './database/database.module.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envFilePath(process.env.NODE_ENV),
      validate: validateEnv,
    }),
    DatabaseModule,
    HealthModule,
  ],
})
export class AppModule {}
