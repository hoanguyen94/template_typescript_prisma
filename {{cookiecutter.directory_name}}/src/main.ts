import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaOptions } from './common/util/kafka.options';
import { CustomLoggerService } from './common/custom-logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      bufferLogs: true,
    },
  );
  app.connectMicroservice<MicroserviceOptions>(kafkaOptions);
  app.useLogger(app.get(CustomLoggerService));
  app.enableShutdownHooks();
  await app.listen(process.env.PORT);
}
bootstrap();
