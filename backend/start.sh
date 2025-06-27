#!/bin/bash

echo "========================================"
echo "   NFC4Care Backend - Spring Boot"
echo "========================================"
echo

echo "Vérification de Java..."
if ! command -v java &> /dev/null; then
    echo "ERREUR: Java n'est pas installé ou n'est pas dans le PATH"
    exit 1
fi

java -version
echo

echo "Compilation du projet..."
if ! mvn clean compile; then
    echo "ERREUR: Échec de la compilation"
    exit 1
fi

echo
echo "Démarrage de l'application..."
echo "L'application sera accessible sur: http://localhost:8080/api"
echo
echo "Pour arrêter l'application, appuyez sur Ctrl+C"
echo

mvn spring-boot:run 