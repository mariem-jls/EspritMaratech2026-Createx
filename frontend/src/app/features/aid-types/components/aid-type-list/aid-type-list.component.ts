// features/aid-types/components/aid-type-list/aid-type-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AidType } from '../../models/aid-types.model';
import { AidTypeService } from '../../services/aid-type.service';

@Component({
  selector: 'app-aid-type-list',
  standalone: false, // ✅ Correct pour les modules traditionnels
  templateUrl: './aid-type-list.component.html',
  styleUrls: ['./aid-type-list.component.css']
})
export class AidTypeListComponent implements OnInit {
  aidTypes: AidType[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private aidTypeService: AidTypeService) {}

  ngOnInit(): void {
    this.loadAidTypes();
  }

  loadAidTypes(): void {
    this.isLoading = true;
    this.aidTypeService.getAll().subscribe({
      next: (data) => {
        this.aidTypes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
        this.errorMessage = 'Impossible de charger les types d\'aide';
        this.isLoading = false;
      }
    });
  }

  deleteAidType(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce type d\'aide ?')) {
      this.aidTypeService.delete(id).subscribe({
        next: () => {
          // Recharger la liste après suppression
          this.loadAidTypes();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  // Filtrer par statut
  get activeAidTypes(): AidType[] {
    return this.aidTypes.filter(aid => aid.active);
  }

  get inactiveAidTypes(): AidType[] {
    return this.aidTypes.filter(aid => !aid.active);
  }
}
// ⚠️ SUPPRIMEZ TOUT CE QUI SUIT ! (l'angular.json ne doit pas être ici)