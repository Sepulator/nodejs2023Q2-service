import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { HashingService } from 'src/iam/hashing/hashing.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly usersService: UsersService,
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

    return true;
  }
}
