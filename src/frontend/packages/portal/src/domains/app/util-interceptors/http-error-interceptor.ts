import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import {inject} from "@angular/core";
import {LoggingService} from "@central-hub/library";
import { ToastrService } from 'ngx-toastr';

export function httpErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const logger = inject(LoggingService);
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const serverMessage = error.error?.message ?? error.message;
      logger.error(serverMessage);

      if (error.status !== 401) {
        toastr.error(`${error.status}: ${serverMessage}`, 'Request Failed');
      }

      return throwError(() => error);
    })
  );
}
