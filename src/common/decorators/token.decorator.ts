import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// jwt 방식으로 로그인할 때 사용할 것
export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    return response.locals.jwt;
  },
);
