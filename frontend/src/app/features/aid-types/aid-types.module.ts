// features/aid-types/aid-types.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Ajouter
import { HttpClientModule } from '@angular/common/http';

import { AidTypesRoutingModule } from './aid-types-routing.module';

// Components (à créer ensuite)
import { AidTypeListComponent } from './components/aid-type-list/aid-type-list.component';
import { AidTypeFormComponent } from './components/aid-type-form/aid-type-form.component';
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
    RouterModule, 
    HttpClientModule,    // Pour les appels API
    AidTypesRoutingModule
  ],
  exports: [
    AidTypeListComponent, // Si besoin d'utiliser ailleurs
    AidTypeCardComponent  // Pour afficher dans Family
  ]
})
export class AidTypesModule { }