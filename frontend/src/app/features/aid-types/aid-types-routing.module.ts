// features/aid-types/aid-types-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AidTypeListComponent } from './components/aid-type-list/aid-type-list.component';
import { AidTypeFormComponent } from './components/aid-type-form/aid-type-form.component';
const routes: Routes = [
  {
    path: '', // Chemin relatif: /aid-types
    children: [
      {
        path: '', // /aid-types
        component: AidTypeListComponent
      },
      {
        path: 'new', // /aid-types/new
        component: AidTypeFormComponent
      },
      {
        path: 'edit/:id', // /aid-types/edit/123
        component: AidTypeFormComponent
      },
      {
        path: 'view/:id', // /aid-types/view/123 (optionnel)
        component: AidTypeFormComponent // Ou un composant dédié
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AidTypesRoutingModule { }