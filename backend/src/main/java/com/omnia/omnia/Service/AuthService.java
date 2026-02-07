package com.omnia.omnia.Service;

import com.omnia.omnia.Entities.Role;
import com.omnia.omnia.Entities.User;
import com.omnia.omnia.Repository.UserRepository;
import com.omnia.omnia.Config.JwtService;
import com.omnia.omnia.dto.AuthResponse;
import com.omnia.omnia.dto.LoginRequest;
import com.omnia.omnia.dto.RegisterRequest;
import com.omnia.omnia.dto.UpdateUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? request.getRole() : Role.Volunteer)
                .active(true)
                .build();

        user = userRepository.save(user);
        var jwtToken = jwtService.generateToken(buildUserDetails(user));
        return buildAuthResponse(user, jwtToken);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getActive()) {
            throw new RuntimeException("User account is deactivated");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(buildUserDetails(user));
        return buildAuthResponse(user, jwtToken);
    }

    public AuthResponse getCurrentUser(String email) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        var jwtToken = jwtService.generateToken(buildUserDetails(user));
        return buildAuthResponse(user, jwtToken);
    }

    public AuthResponse updateUser(UUID id, UpdateUserRequest request, String currentUserEmail) {
        var currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        var userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Vérifier les permissions : Admin peut modifier n'importe qui, user peut se modifier lui-même
        if (!currentUser.getRole().equals(Role.Admin) && !currentUser.getId().equals(id)) {
            throw new RuntimeException("You don't have permission to update this user");
        }

        // Vérifier si l'email est déjà utilisé par un autre utilisateur
        if (request.getEmail() != null && !request.getEmail().equals(userToUpdate.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email already in use");
            }
            userToUpdate.setEmail(request.getEmail());
        }

        if (request.getFirstName() != null) {
            userToUpdate.setFirstName(request.getFirstName());
        }
        if (request.getLastName() != null) {
            userToUpdate.setLastName(request.getLastName());
        }
        if (request.getPhone() != null) {
            userToUpdate.setPhone(request.getPhone());
        }

        // Seul un ADMIN peut changer le rôle
        if (request.getRole() != null && currentUser.getRole().equals(Role.Admin)) {
            userToUpdate.setRole(request.getRole());
        }

        userToUpdate = userRepository.save(userToUpdate);
        var jwtToken = jwtService.generateToken(buildUserDetails(userToUpdate));
        return buildAuthResponse(userToUpdate, jwtToken);
    }

    public void deleteUser(UUID id, String currentUserEmail) {
        var currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        var userToDelete = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Seul un ADMIN peut supprimer un utilisateur, sauf si c'est lui-même
        if (!currentUser.getRole().equals(Role.Admin) && !currentUser.getId().equals(id)) {
            throw new RuntimeException("You don't have permission to delete this user");
        }

        // Empêcher un admin de se supprimer lui-même
        if (currentUser.getId().equals(id) && currentUser.getRole().equals(Role.Admin)) {
            throw new RuntimeException("Admin cannot delete their own account");
        }

        userRepository.delete(userToDelete);
    }

    public void changePassword(String email, String oldPassword, String newPassword) {
        var user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Vérifier l'ancien mot de passe
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, oldPassword)
        );

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void deactivateUser(UUID id, String currentUserEmail) {
        var currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        if (!currentUser.getRole().equals(Role.Admin)) {
            throw new RuntimeException("Only admins can deactivate users");
        }

        var userToDeactivate = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userToDeactivate.setActive(false);
        userRepository.save(userToDeactivate);
    }

    public void activateUser(UUID id, String currentUserEmail) {
        var currentUser = userRepository.findByEmail(currentUserEmail)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        if (!currentUser.getRole().equals(Role.Admin)) {
            throw new RuntimeException("Only admins can activate users");
        }

        var userToActivate = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userToActivate.setActive(true);
        userRepository.save(userToActivate);
    }

    private UserDetails buildUserDetails(User user) {
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(
                        new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
                )
        );
    }

    private AuthResponse buildAuthResponse(User user, String token) {
        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .build();
    }
}