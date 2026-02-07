import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Unauthorized - clear token and redirect to login
        tokenService.clearStorage();
        router.navigate(['/auth/login']);
      }

      if (error.status === 403) {
        // Forbidden - redirect to dashboard
        router.navigate(['/dashboard']);
      }

      return throwError(() => error);
    })
  );
};