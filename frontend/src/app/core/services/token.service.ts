import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../../features/users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // Get token
  getToken(): string | null {
    if (!this.isBrowser) {
      return null;
    }
    return localStorage.getItem('token');
  }

  // Save token
  saveToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }

  // Remove token
  removeToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
  }

  // Get user
  getUser(): User | null {
    if (!this.isBrowser) {
      return null;
    }
    
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }

  // Save user
  saveUser(user: User): void {
    if (this.isBrowser) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  // Remove user
  removeUser(): void {
    if (this.isBrowser) {
      localStorage.removeItem('user');
    }
  }

  // Clear all storage
  clearStorage(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    if (!this.isBrowser) {
      return false;
    }
    return !!this.getToken();
  }

  // Check if token is expired
  isTokenExpired(): boolean {
    if (!this.isBrowser) {
      return true; // Treat as expired on server
    }

    const token = this.getToken();
    if (!token) {
      return true;
    }

    try {
      // Decode JWT token to get expiration
      const payload = this.decodeToken(token);
      
      if (!payload || !payload.exp) {
        return true;
      }

      // Check if token is expired (exp is in seconds, Date.now() is in milliseconds)
      const expirationDate = payload.exp * 1000;
      return Date.now() >= expirationDate;
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  // Get token expiration date
  getTokenExpirationDate(): Date | null {
    if (!this.isBrowser) {
      return null;
    }

    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payload = this.decodeToken(token);
      if (!payload || !payload.exp) {
        return null;
      }

      return new Date(payload.exp * 1000);
    } catch (error) {
      return null;
    }
  }

  // Helper method to decode JWT token
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}