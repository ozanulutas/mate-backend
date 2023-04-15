import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationException } from './config/exceptions';
import { HttpExceptionFilter } from './config/http-exception.filter';
import { ResponseInterceptor } from './config/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: true,
      // transform: true,
      exceptionFactory: (errors) => {
        console.error(errors);
        return new ValidationException();
      },
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.get('PORT'));
}
bootstrap();
