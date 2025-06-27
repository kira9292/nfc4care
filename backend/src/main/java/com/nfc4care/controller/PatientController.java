package com.nfc4care.controller;

import com.nfc4care.dto.PatientDto;
import com.nfc4care.entity.Patient;
import com.nfc4care.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class PatientController {
    
    private final PatientService patientService;
    
    @GetMapping
    public ResponseEntity<List<Patient>> getAllPatients() {
        log.info("Récupération de tous les patients");
        return ResponseEntity.ok(patientService.getAllPatients());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        log.info("Récupération du patient avec l'ID: {}", id);
        Optional<Patient> patient = patientService.getPatientById(id);
        return patient.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/nfc/{numeroNFC}")
    public ResponseEntity<Patient> getPatientByNFC(@PathVariable String numeroNFC) {
        log.info("Récupération du patient par NFC: {}", numeroNFC);
        Optional<Patient> patient = patientService.getPatientByNFC(numeroNFC);
        return patient.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Patient>> searchPatients(@RequestParam String q) {
        log.info("Recherche de patients avec le terme: {}", q);
        return ResponseEntity.ok(patientService.searchPatients(q));
    }
    
    @PostMapping
    public ResponseEntity<Patient> createPatient(@Valid @RequestBody PatientDto patientDto) {
        log.info("Création d'un nouveau patient: {}", patientDto.getNom());
        try {
            Patient createdPatient = patientService.createPatient(patientDto);
            return ResponseEntity.ok(createdPatient);
        } catch (Exception e) {
            log.error("Erreur lors de la création du patient", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @Valid @RequestBody PatientDto patientDto) {
        log.info("Mise à jour du patient avec l'ID: {}", id);
        try {
            Patient updatedPatient = patientService.updatePatient(id, patientDto);
            return ResponseEntity.ok(updatedPatient);
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour du patient", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        log.info("Suppression du patient avec l'ID: {}", id);
        try {
            patientService.deletePatient(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Erreur lors de la suppression du patient", e);
            return ResponseEntity.badRequest().build();
        }
    }
} 