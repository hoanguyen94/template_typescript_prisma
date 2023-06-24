import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
import { CustomLoggerModule } from './common/custom-logger/custom-logger.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { ShutdownService } from './common/util/shutdown.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
import { AppController } from './app.controller';
import config from './common/util/config';

@Module({
  imports: [
    PrismaModule,
    CustomLoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: config().redisUrl,
      isGlobal: true,
      ttl: config().redisTtl as number,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    ShutdownService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
