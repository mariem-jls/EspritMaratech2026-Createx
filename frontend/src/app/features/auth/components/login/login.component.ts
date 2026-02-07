import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../../users/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  showPassword = false;
  isBrowser: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Check if already logged in (only in browser)
    if (this.isBrowser && this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }

    // Initialize form
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  // Submit form
  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(loginRequest).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error('Login error:', error);
        this.error = error.error?.message || 'Email ou mot de passe incorrect';
        this.loading = false;
      }
    });
  }

  // Quick login for testing
  quickLogin(email: string, password: string): void {
    this.loginForm.patchValue({
      email: email,
      password: password
    });
    this.onSubmit();
  }

  // SSR-safe method for any DOM manipulation
  private safeDomOperation(): void {
    if (!this.isBrowser) {
      return;
    }
    // Safe to use document, window, localStorage, etc. here
  }
}