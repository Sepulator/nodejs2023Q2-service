import { Module } from '@nestjs/common';
import { LoggingService } from './loggingservice.service';

@Module({
  providers: [LoggingService],
  exports: [LoggingService],
})
export class LoggerModule {}
