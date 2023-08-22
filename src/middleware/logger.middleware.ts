import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;

      console.log(
        `Logging HTTP request, url: ${originalUrl},
         method: ${method}, body: ${JSON.stringify(
           body,
         )} and status code: ${statusCode}`,
      );
    });

    next();
  }
}
