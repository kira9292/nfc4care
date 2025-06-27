package com.nfc4care.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDto {
    private Long id;
    
    @NotBlank(message = "Le numéro de dossier est obligatoire")
    private String numeroDossier;
    
    @NotBlank(message = "Le nom est obligatoire")
    private String nom;
    
    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;
    
    @NotNull(message = "La date de naissance est obligatoire")
    private LocalDate dateNaissance;
    
    @NotBlank(message = "Le sexe est obligatoire")
    @Pattern(regexp = "^(M|F)$", message = "Le sexe doit être M ou F")
    private String sexe;
    
    @NotBlank(message = "L'adresse est obligatoire")
    private String adresse;
    
    @NotBlank(message = "Le téléphone est obligatoire")
    @Pattern(regexp = "^[0-9]{10}$", message = "Le téléphone doit contenir 10 chiffres")
    private String telephone;
    
    @Email(message = "Format d'email invalide")
    private String email;
    
    @NotBlank(message = "Le numéro de sécurité sociale est obligatoire")
    @Pattern(regexp = "^[0-9]{15}$", message = "Le numéro de sécurité sociale doit contenir 15 chiffres")
    private String numeroSecuriteSociale;
    
    private String groupeSanguin;
    
    private String numeroNFC;
} 