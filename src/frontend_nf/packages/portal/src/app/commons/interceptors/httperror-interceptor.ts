import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export function httpErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(() => console.error(error));
    })
  );
}
