import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { HashingService } from 'src/auth/hashing.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/config/jwt.config';
import { ActiveUserData } from './interfaces/active-user-data.interface';

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

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        login: user.login,
      } as ActiveUserData,
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.tokenTtl,
      },
    );

    return { accessToken };
  }
}
