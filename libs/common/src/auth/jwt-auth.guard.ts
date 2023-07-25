import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { AUTH_SERVICE } from '@app/common/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { map, tap } from 'rxjs';
import { UserDto } from '@app/common/dto/user.dto';

export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly authClient: ClientProxy,
  ) {}
  canActivate(context: ExecutionContext) {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;

    if (!jwt) {
      return false;
    }

    return this.authClient.send('authenticate', { Authentication: jwt }).pipe(
      tap((user: UserDto) => {
        context.switchToHttp().getRequest().user = user;
      }),
      map(() => true),
    );
  }
}
