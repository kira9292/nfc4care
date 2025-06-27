package com.nfc4care.controller;

import com.nfc4care.dto.AuthRequest;
import com.nfc4care.dto.AuthResponse;
import com.nfc4care.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        log.info("Tentative de connexion pour l'utilisateur: {}", request.getEmail());
        
        try {
            AuthResponse response = authService.authenticate(request);
            log.info("Connexion réussie pour l'utilisateur: {}", request.getEmail());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Échec de connexion pour l'utilisateur: {}", request.getEmail(), e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Void> logout() {
        // En production, vous pourriez implémenter une liste noire de tokens
        log.info("Déconnexion demandée");
        return ResponseEntity.ok().build();
    }
} 