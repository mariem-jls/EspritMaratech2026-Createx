// features/aid-types/components/aid-type-form/aid-type-form.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AidTypeService } from '../../services/aid-type.service';
import { AidType, AidTypeCreateDto, AidTypeUpdateDto, AidCategory } from '../../models/aid-types.model';

@Component({
  selector: 'app-aid-type-form',
  standalone: false,
  templateUrl: './aid-type-form.component.html',
  styleUrls: ['./aid-type-form.component.css']
})
export class AidTypeFormComponent implements OnInit {
  aidTypeForm: FormGroup;
  isEditMode = false;
  aidTypeId: string | null = null;
  isLoading = false;
  errorMessage = '';
  
  // Liste des catégories pour le select
  categories = Object.values(AidCategory);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private aidTypeService: AidTypeService
  ) {
    this.aidTypeForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.aidTypeId = params['id'];
        this.loadAidType(this.aidTypeId!);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      description: [''],
      unit: ['', Validators.required],
      active: [true],
      defaultQuantity: [1, [Validators.required, Validators.min(1)]],
      icon: ['']
    });
  }

  loadAidType(id: string): void {
    this.isLoading = true;
    this.aidTypeService.getById(id).subscribe({
      next: (aidType) => {
        this.aidTypeForm.patchValue(aidType);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
        this.errorMessage = 'Impossible de charger le type d\'aide';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.aidTypeForm.invalid) {
      this.markFormGroupTouched(this.aidTypeForm);
      return;
    }

    this.isLoading = true;
    const formValue = this.aidTypeForm.value;
    
    if (this.isEditMode && this.aidTypeId) {
      const updateDto: AidTypeUpdateDto = formValue;
      this.aidTypeService.update(this.aidTypeId, updateDto).subscribe({
        next: () => {
          this.router.navigate(['/aid-types']);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour:', error);
          this.errorMessage = 'Erreur lors de la mise à jour';
          this.isLoading = false;
        }
      });
    } else {
      const createDto: AidTypeCreateDto = formValue;
      this.aidTypeService.create(createDto).subscribe({
        next: () => {
          this.router.navigate(['/aid-types']);
        },
        error: (error) => {
          console.error('Erreur lors de la création:', error);
          this.errorMessage = 'Erreur lors de la création';
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/aid-types']);
  }

  // Méthode utilitaire pour marquer tous les champs comme touchés
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Getters pour faciliter l'accès aux champs dans le template
  get name() { return this.aidTypeForm.get('name'); }
  get category() { return this.aidTypeForm.get('category'); }
  get unit() { return this.aidTypeForm.get('unit'); }
  get defaultQuantity() { return this.aidTypeForm.get('defaultQuantity'); }
}