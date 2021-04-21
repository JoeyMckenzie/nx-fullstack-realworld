import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { ErrorResponse } from '@nx-fullstack-realworld/shared';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const exceptionContext = host.switchToHttp();

    const response = exceptionContext.getResponse<Response>();
    const request = exceptionContext.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      // message: exception.message,
      errors: exception.getResponse(),
    } as ErrorResponse);
  }
}
