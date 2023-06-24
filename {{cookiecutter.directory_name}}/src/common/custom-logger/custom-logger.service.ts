import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

@Injectable()
export class CustomLoggerService implements LoggerService {
  constructor(public readonly logger: Logger) {}
  log(message: any, ...optionalParams: any[]) {
    return this.logger.log(message, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    return this.logger.error(message, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    return this.logger.warn(message, ...optionalParams);
  }
  debug?(message: any, ...optionalParams: any[]) {
    return this.logger.warn(message, ...optionalParams);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    return this.logger.verbose(message, ...optionalParams);
  }
  setLogLevels?(levels: LogLevel[]) {
    return;
  }
}
