import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../../features/users/models/user.model';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentUser = authService.currentUserValue;
  const expectedRoles: Role[] = route.data['roles'];

  if (!currentUser) {
    router.navigate(['/auth/login']);
    return false;
  }

  if (expectedRoles && !expectedRoles.includes(currentUser.role)) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};