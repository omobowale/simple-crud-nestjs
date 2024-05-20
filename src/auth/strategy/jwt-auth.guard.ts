import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { jwtConstants } from '../../../constants/index';


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secretKey,
    });
  }

  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.email,
    };
  }
}
