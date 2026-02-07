import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User,
  UpdateUserRequest 
} from '../../features/users/models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    // Load user from storage on init
    const user = this.tokenService.getUser();
    if (user) {
      this.currentUserSubject.next(user);
    }
  }

  // Register
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  // Login
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  // Logout
  logout(): void {
    this.tokenService.clearStorage();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  // Get current user
  getCurrentUser(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/me`);
  }

  // Update user
  updateUser(id: string, request: UpdateUserRequest): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${this.apiUrl}/update/${id}`, request)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  // Delete user
  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Change password
  changePassword(oldPassword: string, newPassword: string): Observable<string> {
    return this.http.put<string>(
      `${this.apiUrl}/change-password`,
      null,
      { params: { oldPassword, newPassword }, responseType: 'text' as 'json' }
    );
  }

  // Deactivate user
  deactivateUser(id: string): Observable<string> {
    return this.http.patch<string>(
      `${this.apiUrl}/deactivate/${id}`,
      null,
      { responseType: 'text' as 'json' }
    );
  }

  // Activate user
  activateUser(id: string): Observable<string> {
    return this.http.patch<string>(
      `${this.apiUrl}/activate/${id}`,
      null,
      { responseType: 'text' as 'json' }
    );
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn() && !this.tokenService.isTokenExpired();
  }

  // Get current user value
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  // Handle auth response
  private handleAuthResponse(response: AuthResponse): void {
    this.tokenService.saveToken(response.token);
    
    const user: User = {
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
      role: response.role as any,
      active: true
    };
    
    this.tokenService.saveUser(user);
    this.currentUserSubject.next(user);
  }
}