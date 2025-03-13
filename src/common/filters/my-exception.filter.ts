import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { response } from 'express';

@Catch(BadRequestException)
export class MyExceptionFilter<T extends BadRequestException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(404).json({
      message: 'Deu Erro',
    });
  }
}
