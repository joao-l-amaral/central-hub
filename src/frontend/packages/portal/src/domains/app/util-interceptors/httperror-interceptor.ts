import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import {inject} from "@angular/core";
import {LoggingService} from "@central-hub/library";

export function httpErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const logger = inject(LoggingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => logger.error(error.message));
    })
  );
}
