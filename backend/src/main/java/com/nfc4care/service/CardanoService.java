package com.nfc4care.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CardanoService {
    
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    
    @Value("${blockfrost.api.key}")
    private String blockfrostApiKey;
    
    @Value("${blockfrost.api.base-url}")
    private String blockfrostBaseUrl;
    
    public String sendToBlockchain(String patientId, String action, String content, String authorId) {
        try {
            // Générer le hash SHA-256 du contenu
            String hash = generateSHA256Hash(content);
            
            // Créer les métadonnées
            Map<String, Object> metadata = createMetadata(patientId, action, hash, authorId);
            
            // Envoyer la transaction à Cardano via Blockfrost
            String transactionHash = sendTransaction(metadata);
            
            log.info("Transaction envoyée à Cardano: {}", transactionHash);
            return transactionHash;
            
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi à la blockchain: {}", e.getMessage(), e);
            throw new RuntimeException("Erreur lors de l'envoi à la blockchain", e);
        }
    }
    
    private String generateSHA256Hash(String content) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(content.getBytes(StandardCharsets.UTF_8));
        
        StringBuilder hexString = new StringBuilder();
        for (byte b : hash) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }
    
    private Map<String, Object> createMetadata(String patientId, String action, String hash, String authorId) {
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("patient_id", patientId);
        metadata.put("action", action);
        metadata.put("hash", hash);
        metadata.put("author_id", authorId);
        metadata.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        return metadata;
    }
    
    private String sendTransaction(Map<String, Object> metadata) {
        // Note: Cette implémentation est simplifiée
        // En production, vous devriez implémenter la logique complète de transaction Cardano
        
        return webClient.post()
                .uri(blockfrostBaseUrl + "/tx/submit")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + blockfrostApiKey)
                .header(HttpHeaders.CONTENT_TYPE, "application/cbor")
                .bodyValue(metadata)
                .retrieve()
                .bodyToMono(JsonNode.class)
                .map(response -> response.get("tx_hash").asText())
                .block();
    }
    
    public boolean verifyTransaction(String transactionHash, String expectedHash) {
        try {
            JsonNode transaction = webClient.get()
                    .uri(blockfrostBaseUrl + "/tx/" + transactionHash + "/metadata")
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + blockfrostApiKey)
                    .retrieve()
                    .bodyToMono(JsonNode.class)
                    .block();
            
            if (transaction != null && transaction.has("hash")) {
                String storedHash = transaction.get("hash").asText();
                return storedHash.equals(expectedHash);
            }
            
            return false;
        } catch (Exception e) {
            log.error("Erreur lors de la vérification de la transaction: {}", e.getMessage(), e);
            return false;
        }
    }
} 