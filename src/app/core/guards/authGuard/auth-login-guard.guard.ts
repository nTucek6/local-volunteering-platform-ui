import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of, take, tap } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

export const authLoginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.isLoggedIn().pipe(
    tap((isLoggedIn) => {
      if (isLoggedIn) {
        router.navigate(['/']);
      }
    }),
    map(isLoggedIn => !isLoggedIn)
  );
};
