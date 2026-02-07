// features/aid-types/models/aid-type.model.ts

export enum AidCategory {
  Food = 'Food',
  Medicine = 'Medicine',
  Clothing = 'Clothing',
  Hygiene = 'Hygiene',
  Shelter = 'Shelter',
  Financial = 'Financial',
  Education = 'Education',
  Other = 'Other'
}

export interface AidType {
  id: string;
  name: string;
  category: AidCategory;
  description?: string;
  unit: string;
  active: boolean;
  defaultQuantity: number;
  icon?: string;
}

// DTOs pour création/mise à jour
export interface AidTypeCreateDto {
  name: string;
  category: AidCategory;
  description?: string;
  unit: string;
 active: boolean;
 defaultQuantity?: number;
  icon?: string;
}

export interface AidTypeUpdateDto extends Partial<AidTypeCreateDto> {}