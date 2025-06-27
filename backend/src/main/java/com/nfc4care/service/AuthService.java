package com.nfc4care.service;

import com.nfc4care.dto.AuthRequest;
import com.nfc4care.dto.AuthResponse;
import com.nfc4care.entity.Professionnel;
import com.nfc4care.repository.ProfessionnelRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    
    private final ProfessionnelRepository professionnelRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        
        Professionnel professionnel = professionnelRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Professionnel non trouvé"));
        
        // Mettre à jour la dernière connexion
        professionnel.setDerniereConnexion(LocalDateTime.now());
        professionnelRepository.save(professionnel);
        
        String token = jwtService.generateToken(professionnel);
        
        return AuthResponse.builder()
                .token(token)
                .professionnelId(professionnel.getId())
                .nom(professionnel.getNom())
                .prenom(professionnel.getPrenom())
                .email(professionnel.getEmail())
                .role(professionnel.getRole().name())
                .build();
    }
    
    public void initializeDefaultProfessionnel() {
        if (!professionnelRepository.existsByEmail("doctor@example.com")) {
            Professionnel defaultDoctor = Professionnel.builder()
                    .email("doctor@example.com")
                    .password(passwordEncoder.encode("password"))
                    .nom("Dubois")
                    .prenom("Martin")
                    .specialite("Médecine générale")
                    .numeroRPPS("12345678901")
                    .role(Professionnel.Role.MEDECIN)
                    .actif(true)
                    .build();
            
            professionnelRepository.save(defaultDoctor);
            log.info("Professionnel par défaut créé: {}", defaultDoctor.getEmail());
        }
    }
} 