import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const startTime = Date.now();

    console.log(
      `Interceptor connetion travado em 3 segundos antes STARTTIME: ${startTime}`,
    );

    return next.handle().pipe(
      tap(() => {
        const finalTime = Date.now();
        const elapsedTime = finalTime - startTime;
        console.log(
          `TimingConnectionInterceptor depois ELPSEDTIME: ${elapsedTime}`,
        );
      }),
    );
  }
}
