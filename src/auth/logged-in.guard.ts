import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
    // 인증을 받았는지(로그인 했는지)에 대한 값을 boolean으로 반환한다.
    // 이 가드가 데코레이터로 붙은 api는 로그인 한 사용자만 사용할 수 있다.
  }
}
