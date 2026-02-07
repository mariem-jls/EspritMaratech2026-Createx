export interface Visit {
  id?: string;
  familyId: string;
  userId: string;
  visitDate: Date;
  notes?: string;
  status: VisitStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export enum VisitStatus {
  PLANNED = 'Planned',
  COMPLETED = 'Completed',
  CANCELLED = 'Canceled'
}

export interface VisitCreateRequest {
  familyId: string;
  userId: string;
  visitDate: Date;
  notes?: string;
  status: VisitStatus;
}