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
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number } // 개발자가 임의로 발생시킨 에러(ex. UnauthorizedException)
      | {
          error: string;
          statusCode: 400;
          message: string[];
        }; // class-validator가 발생시킨 에러의 형식

    console.log(status, err);

    // class-validator가 출력하는 에러의 형식
    if (typeof err !== 'string' && err.statusCode === 400) {
      return response.status(status).json({
        success: false,
        code: status,
        data: err.message,
      });
    }

    // 개발자가 임의로 발생시킨 에러(ex. UnauthorizedException)
    response.status(status).json({
      success: false,
      code: status,
      data: err.message,
    });
  }
}
