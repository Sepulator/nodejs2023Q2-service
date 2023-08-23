import { Injectable } from '@nestjs/common';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class HashingService {
  async hash(data: string | Buffer): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}