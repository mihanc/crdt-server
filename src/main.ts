import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions = {
    credentials: true,
    origin: ['http://localhost:4200'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS,PATCH',
  };

  app.use(cookieParser());
  app.useWebSocketAdapter(new WsAdapter(app));
  app.enableCors(corsOptions);
  await app.listen(3000);
}

bootstrap();
