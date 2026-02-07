// features/aid-types/aid-types.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AidTypesRoutingModule } from './aid-types-routing.module';

// Components
import { AidTypeListComponent } from './components/aid-type-list/aid-type-list.component';
import { AidTypeFormComponent } from './components/aid-type-form/aid-type-form.component'
import { AidTypeCardComponent } from './components/aid-type-card/aid-type-card.component';

@NgModule({
  declarations: [
    AidTypeListComponent,
    AidTypeFormComponent,
    AidTypeCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AidTypesRoutingModule // Contient RouterModule
  ],
  exports: [
    // Exportez seulement si utilisé dans d'autres modules features
    // Ex: AidTypeCardComponent pour sélection dans FamilyForm
  ]
})
export class AidTypesModule { }