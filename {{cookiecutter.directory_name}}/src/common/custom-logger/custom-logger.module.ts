import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './custom-logger.service';
import { LoggerModule } from 'nestjs-pino/LoggerModule';

@Global()
@Module({
  imports: [LoggerModule.forRoot()],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
