import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.enableCors({
    origin: [
      /\.theultimateclosers\.com$/,
      'https://theultimateclosers.com',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: 'same-origin' },
      crossOriginResourcePolicy: { policy: 'same-site' },
      crossOriginEmbedderPolicy: false, // ajuster si COEP/COOP
    }),
  );

  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
  app.use(compression());

  // Health/Ready pour probes & monitoring
  app
    .getHttpAdapter()
    .getInstance()
    .get('/health', (_: any, res: any) => res.status(200).send({ ok: true }));
  app
    .getHttpAdapter()
    .getInstance()
    .get('/ready', (_: any, res: any) => res.status(200).send({ db: 'ok', queue: 'ok' }));

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
