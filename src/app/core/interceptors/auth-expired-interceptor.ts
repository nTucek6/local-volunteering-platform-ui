import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  private authService = inject(AuthService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime && !this.isRefreshing) {
        console.log('Token has expired, refreshing token...');
        this.isRefreshing = true;
        return this.authService.refreshToken().pipe(
          switchMap((response) => {
            this.isRefreshing = false;
            if (response && response.tokens) {
              localStorage.setItem('token', response.tokens.accessToken);
              localStorage.setItem(
                'refreshToken',
                response.tokens.refreshToken
              );
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.tokens.accessToken}`,
                },
              });
            }
            return next.handle(req);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            console.error('Refresh token failed:', error);
            return this.authService.logout();
          })
        );
      }
      return next.handle(
        req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      );
    }
    return next.handle(req);
  }
}
