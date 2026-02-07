// features/families/families.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FamiliesRoutingModule } from './families-routing.module';
import { FamilyListComponent } from './components/family-list/family-list.component';
import { FamilyFormComponent } from './components/family-form/family-form.component';
import { FamilyDetailComponent } from './components/family-detail/family-detail.component';

@NgModule({
  declarations: [
    FamilyListComponent,
    FamilyFormComponent,
    FamilyDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    FamiliesRoutingModule
  ]
})
export class FamiliesModule { }