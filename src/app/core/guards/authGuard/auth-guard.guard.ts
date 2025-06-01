import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated: Boolean = false;

  if (isAuthenticated && (state.url === '/')) {
    router.navigate(['/dashboard']);
    return false;
  }

  return isAuthenticated ? false : true;
};
