import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/custom-logger/custom-logger.service';

@Injectable()
export class ShutdownService implements OnApplicationShutdown {
  constructor(private logger: CustomLoggerService) {}
  onApplicationShutdown(signal?: string) {
    this.logger.log(`Receiving signal ${signal} Gracefully shutting down`);
  }
}
