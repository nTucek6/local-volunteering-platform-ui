import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment ';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  private apiUrl = `${environment.apiUrl}`;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !request ||
      !request.url ||
      (request.url.startsWith('http') &&
        !(this.apiUrl && request.url.startsWith(this.apiUrl)))
    ) {
      return next.handle(request);
    }

    // add content type
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
    }
    return next.handle(request);
  }
}
