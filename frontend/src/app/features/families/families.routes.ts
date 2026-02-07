import { Routes } from '@angular/router';

export const familiesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/family-list/family-list.component')
      .then(m => m.FamilyListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./components/family-form/family-form.component')
      .then(m => m.FamilyFormComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./components/family-detail/family-detail.component')
      .then(m => m.FamilyDetailComponent)
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./components/family-form/family-form.component')
      .then(m => m.FamilyFormComponent)
  }
];