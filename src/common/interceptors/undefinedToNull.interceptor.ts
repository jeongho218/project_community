import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    /* 컨트롤러 실행 전 수행할 내용을 들어갈 부분 */
    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
    /**  컨트롤러 실행 후 리턴하는 데이터가 undefined라면 이 데이터를 null로 변경하고,
     * 데이터가 undefined가 아니라면 data를 그대로 리턴한다.
     */
  }
}
