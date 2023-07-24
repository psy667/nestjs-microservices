import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interfaces/token-payload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          console.log(request.cookies);
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    console.log({ userId });
    return this.userService.getUser({ _id: userId });
  }
}
