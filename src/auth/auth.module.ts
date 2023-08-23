import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingService } from './hashing.service';
import { UsersService } from 'src/users/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    PrismaModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, HashingService, UsersService],
})
export class AuthModule {}
