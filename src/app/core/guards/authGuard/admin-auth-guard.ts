import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkLogin();
    }

    private checkLogin(): Observable<boolean> {
        return this.authService.isUserAdmin().pipe(
            map(isAdmin => {
                if (isAdmin) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                    return false;
                }
            }),
            catchError(() => {
                this.router.navigate(['/']);
                return of(false);
            })
        );
    }
}