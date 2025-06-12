import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment ';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private apiUrl = `${environment.apiUrl}`;
  private authUrl = `${environment.authUrl}`;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !request ||
      !request.url ||
      (request.url.startsWith('http') &&
        !(this.apiUrl && request.url.startsWith(this.apiUrl)) &&
        !(this.authUrl && request.url.startsWith(this.authUrl)))
    ) {
      return next.handle(request);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
       'Accept': 'application/json',
    });

    request = request.clone({
      headers: headers,
      withCredentials: true,
    });

    return next.handle(request);
  }
}
