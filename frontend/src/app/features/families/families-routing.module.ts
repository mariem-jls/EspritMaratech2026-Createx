// features/families/families-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyListComponent } from './components/family-list/family-list.component';
import { FamilyFormComponent } from './components/family-form/family-form.component';
import { FamilyDetailComponent } from './components/family-detail/family-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FamilyListComponent
  },
  {
    path: 'new',
    component: FamilyFormComponent
  },
  {
    path: ':id',
    component: FamilyDetailComponent
  },
  {
    path: ':id/edit',
    component: FamilyFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamiliesRoutingModule { }