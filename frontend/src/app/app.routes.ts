import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  {
    path: 'families',
    canActivate: [authGuard],
    loadChildren: () => import('./features/families/families.routes').then(m => m.familiesRoutes)
  },
  {
    path: 'families/new',
    loadComponent: () => import('./features/families/components/family-form/family-form.component')
      .then(m => m.FamilyFormComponent)
  },
  {
    path: 'families/:id/edit',
    loadComponent: () => import('./features/families/components/family-form/family-form.component')
      .then(m => m.FamilyFormComponent)
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadChildren: () => import('./features/users/users.routes').then(m => m.usersRoutes)
  },
  {
    path: 'aid-types',
    canActivate: [authGuard],
    loadChildren: () => import('./features/aid-types/aid-types.module')
      .then(m => m.AidTypesModule)
  },
  //{
  //  path: 'families',
  //  loadChildren: () => import('./features/families/families.module')
   //   .then(m => m.FamiliesModule)
  //},
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];