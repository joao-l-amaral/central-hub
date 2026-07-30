import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RequestOptions} from "./request-factory.types";

@Injectable()
export class RequestFactory {
  readonly #http = inject(HttpClient);

  get<T>(url: string, options?: RequestOptions) {
    return this.#http.get<T>(url, this.#buildOptions(options));
  }

  post<T>(url: string, body: unknown, options?: RequestOptions) {
    return this.#http.post<T>(url, body, this.#buildOptions(options));
  }

  put<T>(url: string, body: unknown, options?: RequestOptions) {
    return this.#http.put<T>(url, body, this.#buildOptions(options));
  }

  patch<T>(url: string, body: unknown, options?: RequestOptions) {
    return this.#http.patch<T>(url, body, this.#buildOptions(options));
  }

  delete<T>(url: string, options?: RequestOptions) {
    return this.#http.delete<T>(url, this.#buildOptions(options));
  }

  #buildOptions(options?: RequestOptions) {
    if (!options) return {};
    const { params, headers, context } = options;
    return {
      params: params instanceof HttpParams ? params : this.#toHttpParams(params),
      headers,
      context
    };
  }

  #toHttpParams(params?: Record<string, unknown>) {
    if (!params) return undefined;
    let httpParams = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      if (value !== "") {
        httpParams = httpParams.set(key, value as string);
      }
    }
    return httpParams;
  }
}
