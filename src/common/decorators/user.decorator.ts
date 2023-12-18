import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 세션 방식으로 로그인할때 사용할 것
// 개발 후 삭제 예정
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
