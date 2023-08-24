import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';

@Auth(AuthType.None)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() createAuthDto: AuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() createAuthDto: AuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('refresh')
  refreshToken(@Body() data: RefreshTokenDto) {
    return data;
  }
}
