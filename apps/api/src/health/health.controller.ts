import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service.js';

@Controller('health')
export class HealthController {
  constructor(private readonly database: DatabaseService) {}

  @Get()
  async check() {
    const database = (await this.database.ping()) ? 'up' : 'down';
    const body = { status: database === 'up' ? 'ok' : 'error', checks: { database } };
    if (database === 'down') throw new ServiceUnavailableException(body);
    return body;
  }
}
