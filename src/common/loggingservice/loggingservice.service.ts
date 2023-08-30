import { Injectable, LogLevel, LoggerService } from '@nestjs/common';
import { join } from 'path';
import { WriteStream, createWriteStream, writeFileSync } from 'fs';
import { EOL } from 'os';
import { stat } from 'fs/promises';
import dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { cwd } from 'process';

const KiB = 1024;

@Injectable()
export class LoggingService implements LoggerService {
  protected stream: WriteStream;
  protected filePath: string;
  protected logLevel: number;

  constructor(private readonly configService: ConfigService) {
    this.logLevel = configService.get('logLevel');
    this.createStream();
  }

  protected createPath() {
    const date = dayjs().format('YYYY-MM-DD HH-mm-ss');
    const fileName = join(`${cwd()}`, `nest-${date}.log`);
    writeFileSync(fileName, '');
    return fileName;
  }

  protected createStream() {
    this.filePath = this.createPath();

    this.stream = createWriteStream(this.filePath, {
      flags: 'a',
      autoClose: true,
    });
  }

  protected async write(data: string, logLevel: LogLevel) {
    const stats = await stat(this.filePath);
    const fileSize = stats.size / KiB;

    if (fileSize >= this.configService.get('fileSize')) {
      this.createStream();
    }

    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const formattedData = `${logLevel.toUpperCase()} ${date} ${data}${EOL}${EOL}`;
    this.stream.write(formattedData);
  }

  async log(message: any, ...optionalParams: any[]) {
    if (this.logLevel < 2) return;

    const data = JSON.stringify({ message, optionalParams }, null, '\t');

    await this.write(data, 'log');
  }

  async error(message: any, ...optionalParams: any[]) {
    const data = JSON.stringify({ message, optionalParams }, null, '\t');

    await this.write(data, 'error');
  }

  async warn(message: any, ...optionalParams: any[]) {
    if (this.logLevel < 1) return;

    const data = JSON.stringify({ message, optionalParams }, null, '\t');

    await this.write(data, 'warn');
  }

  async debug?(message: any, ...optionalParams: any[]) {
    if (this.logLevel < 3) return;

    const data = JSON.stringify({ message, optionalParams }, null, '\t');

    await this.write(data, 'debug');
  }

  async verbose?(message: any, ...optionalParams: any[]) {
    if (this.logLevel < 4) return;

    const data = JSON.stringify({ message, optionalParams }, null, '\t');

    await this.write(data, 'verbose');
  }
}
