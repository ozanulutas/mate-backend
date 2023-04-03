import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    const payload = {
      ...(typeof errorResponse === 'string'
        ? { message: errorResponse }
        : errorResponse),
      statusCode: status,
      error: exception.name,
    };

    response.status(status).json(payload);
    console.error({ exception });
  }
}
