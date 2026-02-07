// features/aid-types/components/aid-type-card/aid-type-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AidType, AidCategory } from '../../models/aid-types.model';

@Component({
  selector: 'app-aid-type-card',
  standalone: false,
  templateUrl: './aid-type-card.component.html',
  styleUrls: ['./aid-type-card.component.css']
})
export class AidTypeCardComponent {
  @Input() aidType!: AidType;
  @Input() showActions = false;
  @Input() selectable = false;
  @Input() selected = false;
  
  @Output() selectedChange = new EventEmitter<boolean>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  getCategoryColor(category: AidCategory): string {
    const colors: Record<AidCategory, string> = {
      [AidCategory.Food]: 'primary',
      [AidCategory.Medicine]: 'danger',
      [AidCategory.Clothing]: 'warning',
      [AidCategory.Hygiene]: 'info',
      [AidCategory.Shelter]: 'success',
      [AidCategory.Financial]: 'dark',
      [AidCategory.Education]: 'purple',
      [AidCategory.Other]: 'secondary'
    };
    return colors[category] || 'secondary';
  }

  getCategoryIcon(category: AidCategory): string {
    const icons: Record<AidCategory, string> = {
      [AidCategory.Food]: 'fa-utensils',
      [AidCategory.Medicine]: 'fa-pills',
      [AidCategory.Clothing]: 'fa-tshirt',
      [AidCategory.Hygiene]: 'fa-soap',
      [AidCategory.Shelter]: 'fa-home',
      [AidCategory.Financial]: 'fa-money-bill-wave',
      [AidCategory.Education]: 'fa-book',
      [AidCategory.Other]: 'fa-hands-helping'
    };
    return icons[category] || 'fa-box';
  }

  onToggleSelect(): void {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

  onEdit(): void {
    this.edit.emit(this.aidType.id);
  }

  onDelete(): void {
    if (confirm(`Supprimer "${this.aidType.name}" ?`)) {
      this.delete.emit(this.aidType.id);
    }
  }
}