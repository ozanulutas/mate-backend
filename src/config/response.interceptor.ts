import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<
      // @TODO: type this
      T & { toast: any; popup: any; data: any; actionCode: any }
    >,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    return next.handle().pipe(
      map((responsePayload) => {
        const { data, toast, popup, actionCode } = responsePayload ?? {};

        return {
          data: data ?? responsePayload,
          result: {
            toast,
            popup,
            actionCode,
          },
        };
      }),
    );
  }
}
