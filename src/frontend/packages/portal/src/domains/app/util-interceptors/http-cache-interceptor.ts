import {
  HttpHandlerFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { of, tap } from 'rxjs';
import { CACHE_CONTEXT } from '@central-hub/library';

interface CacheEntry {
  url: string;
  response: HttpResponse<unknown>;
  expiryLimit: number;
}

const cache = new Map<string, CacheEntry>();

export function httpCacheInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const timeToExpireInMillis = 60_000; // 1 minute

  const cacheContext = req.context.get(CACHE_CONTEXT);

  if (req.method !== 'GET' || !cacheContext) {
    return next(req);
  }

  const cached = cache.get(req.urlWithParams);

  if (cached && Date.now() < cached.expiryLimit) {
    return of(cached.response.clone());
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(req.urlWithParams, {
          url: req.urlWithParams,
          response: event.clone(),
          expiryLimit: Date.now() + timeToExpireInMillis,
        });
      }
    }),
  );
}
