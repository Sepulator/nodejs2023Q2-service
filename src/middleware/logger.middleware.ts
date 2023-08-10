import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Logging HTTP request, url: ${req.originalUrl},
       method: ${req.method}, body: ${JSON.stringify(
         req.body,
       )} and status code: ${res.statusCode}`,
    );
    next();
  }
}
