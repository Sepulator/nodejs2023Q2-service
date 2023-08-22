import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/loggingservice/loggingservice.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { originalUrl, method, body } = req;

    res.on('finish', () => {
      const { statusCode } = res;

      // eslint-disable-next-line prettier/prettier
      this.logger.log(`Request, url: ${originalUrl}, method: ${method}, body: ${JSON.stringify(body)}`);
      this.logger.log(`Response, status code: ${statusCode}`);
    });

    next();
  }
}
