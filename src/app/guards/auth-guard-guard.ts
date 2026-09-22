import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from '../services/auth/authservice';

export const authGuard: CanActivateFn = () => {
  const authService = inject(Authservice);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};

export const adminGuard: CanActivateFn = () => {
  const authService = inject(Authservice);
  const router = inject(Router);

  if (authService.isAuthorised('string')) {
    return true;
  }

  return router.createUrlTree(['/admin']);
};
