import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from '../strategy/jwt-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.authService.register(user);
  }

  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }
}
