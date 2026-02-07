export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password?: string;
  role: Role;
  active: boolean;
  createdAt?: Date;
  lastLoginAt?: Date;
}

export enum Role {
  ADMIN = 'Admin',
  COORDINATOR = 'Coordinator',
  VOLUNTEER = 'Volunteer',
  MANAGER = 'Manager'
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role?: Role;
}

export interface AuthResponse {
  token: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: Role;
}