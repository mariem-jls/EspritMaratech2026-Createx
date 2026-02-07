package com.omnia.omnia.Controller;

import com.omnia.omnia.dto.AuthResponse;
import com.omnia.omnia.dto.LoginRequest;
import com.omnia.omnia.dto.RegisterRequest;
import com.omnia.omnia.dto.UpdateUserRequest;
import com.omnia.omnia.Service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:4300"})
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth endpoint is working");
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser(Authentication authentication) {
        return ResponseEntity.ok(authService.getCurrentUser(authentication.getName()));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<AuthResponse> updateUser(
            @PathVariable UUID id,
            @RequestBody UpdateUserRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(authService.updateUser(id, request, authentication.getName()));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable UUID id,
            Authentication authentication) {
        authService.deleteUser(id, authentication.getName());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(
            @RequestParam String oldPassword,
            @RequestParam String newPassword,
            Authentication authentication) {
        authService.changePassword(authentication.getName(), oldPassword, newPassword);
        return ResponseEntity.ok("Password changed successfully");
    }

    @PatchMapping("/deactivate/{id}")
    public ResponseEntity<String> deactivateUser(
            @PathVariable UUID id,
            Authentication authentication) {
        authService.deactivateUser(id, authentication.getName());
        return ResponseEntity.ok("User deactivated successfully");
    }

    @PatchMapping("/activate/{id}")
    public ResponseEntity<String> activateUser(
            @PathVariable UUID id,
            Authentication authentication) {
        authService.activateUser(id, authentication.getName());
        return ResponseEntity.ok("User activated successfully");
    }
}