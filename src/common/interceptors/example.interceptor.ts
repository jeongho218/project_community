import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

// 이 파일은 인터셉터의 예시를 위해서 작성됨
// 프로젝트 배포시 삭제할 것

@Injectable()
export class ExampleInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // return next.handle();
    // return next.handle()을 기준으로,
    // 기준점 이전에는 컨트롤러로 돌아가기 전 수행할 동작을,
    // 컨트롤러가 실행되고 난 후 수행할 동작은 기준점 다음에 작성

    return next.handle().pipe(map((data) => ({ data, code: 'SUCCESS' })));
    // 컨트롤러 작업 후 리턴하는 값을 { data, code 'SUCCESS' }의 형식으로 반환는 기능을 함
  }
}
