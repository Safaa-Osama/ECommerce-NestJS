
// import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { STATUS_CODES } from 'http';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception.getStatus();

//     response
//       .status(status)
//       .json({
//         statusCode: status,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//       });
//   }
// }



// export class AppError extends HttpException {
//   constructor(message:string, statusCode:number) {
//     super(message, statusCode);
//   }
// }

// @Catch(AppError)
// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: AppError, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const status = exception.getStatus();

//     response.status(status).json({
//       statusCode: status,
//       message: exception.message,
//     });
//   }
// }
