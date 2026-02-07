import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';
import { Role } from './models/user.model';

export const usersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/user-list/user-list.component')
      .then(m => m.UserListComponent),
    canActivate: [roleGuard],
    data: { roles: [Role.ADMIN, Role.COORDINATOR] }
  },
  {
    path: 'profile',
    loadComponent: () => import('./components/profile/profile.component')
      .then(m => m.ProfileComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/user-detail/user-detail.component')
      .then(m => m.UserDetailComponent),
    canActivate: [roleGuard],
    data: { roles: [Role.ADMIN] }
  }
];