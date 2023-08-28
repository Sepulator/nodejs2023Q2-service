import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { LoggingService } from './common/loggingservice/loggingservice.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configDoc = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('doc', app, document);

  const config = app.get(ConfigService);
  const port = config.get('PORT');

  const logger = await app.resolve(LoggingService);
  const httpAdapter = app.get(HttpAdapterHost);

  app.useLogger(logger);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter, logger));

  await app.listen(port);

  process.on('uncaughtException ', (message) => {
    logger.log('uncaughtException');
    logger.error(message);
    throw message;
  });

  process.on('unhandledRejection', (message) => {
    logger.log('unhandledRejection');
    logger.error(message);
  });
}
bootstrap();
