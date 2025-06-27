package com.nfc4care.repository;

import com.nfc4care.entity.Professionnel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessionnelRepository extends JpaRepository<Professionnel, Long> {
    
    Optional<Professionnel> findByEmail(String email);
    
    Optional<Professionnel> findByNumeroRPPS(String numeroRPPS);
    
    boolean existsByEmail(String email);
    
    boolean existsByNumeroRPPS(String numeroRPPS);
} 