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
    next: CallHandler<T & { notification: any; popup: any; data: any }>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    return next.handle().pipe(
      map((responsePayload) => {
        const { data, notification, popup } = responsePayload;

        return {
          data: data ?? responsePayload,
          result: {
            notification,
            popup,
          },
        };
      }),
    );
  }
}
