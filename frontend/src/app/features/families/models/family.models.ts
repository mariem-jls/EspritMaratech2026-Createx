export interface Family {
  id?: string;
  name: string;
  description?: string;
  address: string;
  phone: string;
  priorityLevel: PriorityLevel;
  status: FamilyStatus;
  numberOfMembers: number;
  monthlyIncome?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum PriorityLevel {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low'
}

export enum FamilyStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ARCHIVED = 'ARCHIVED'
}

export interface FamilyCreateRequest {
  name: string;
  description?: string;
  address: string;
  phone: string;
  priorityLevel: PriorityLevel;
  status: FamilyStatus;
  numberOfMembers: number;
  monthlyIncome?: number;
}