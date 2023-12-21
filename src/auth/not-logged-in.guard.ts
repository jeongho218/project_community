import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return !request.isAuthenticated();
    // 인증에 대한 내용이 거짓 = 로그인하지 않은 사용자
    // 이 가드가 데코레이터로 붙은 api는 로그인하지 않은 사용자만 사용할 수 있다.
  }
}
