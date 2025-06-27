package com.nfc4care;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class Nfc4CareApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(Nfc4CareApplication.class, args);
    }
} 