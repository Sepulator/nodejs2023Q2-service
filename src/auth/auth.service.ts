import {
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { User } from '@prisma/client';

import { AuthDto } from './dto/auth.dto';
import { HashingService } from 'src/auth/hashing.service';
import { UsersService } from 'src/users/users.service';
import jwtConfig from 'src/config/jwt.config';
import { ActiveUserData } from './interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(authDto: AuthDto) {
    const hash = await this.hashingService.hash(authDto.password);
    const user = await this.usersService.create({
      ...authDto,
      password: hash,
    });
    return user;
  }

  async login(authDto: AuthDto) {
    const user = await this.usersService.findOneByLogin(authDto.login);
    const isEqual = await this.hashingService.compare(
      authDto.password,
      user.password,
    );

    if (!isEqual)
      throw new ForbiddenException(`Password doesn\'t match actual one`);

    return await this.generateTokens(user);
  }

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.secret,
        this.jwtConfiguration.tokenTtl,
        { login: user.login },
      ),
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.secretRefresh,
        this.jwtConfiguration.tokenTtlRefresh,
        { login: user.login },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secretRefresh,
      });

      const user = await this.usersService.findOneOriginal(sub);
      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async signToken<T>(
    userId: string,
    secret: string,
    expiresIn: string,
    payload: T,
  ) {
    return await this.jwtService.signAsync(
      { sub: userId, ...payload },
      {
        secret,
        expiresIn,
      },
    );
  }
}
