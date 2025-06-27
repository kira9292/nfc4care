#!/bin/bash

echo "========================================"
echo "   NFC4Care - Installation"
echo "========================================"
echo

echo "Vérification des prérequis..."
echo

echo "Vérification de Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERREUR: Node.js n'est pas installé"
    echo "Veuillez installer Node.js depuis https://nodejs.org/"
    exit 1
fi
node --version

echo
echo "Vérification de Java..."
if ! command -v java &> /dev/null; then
    echo "ERREUR: Java n'est pas installé"
    echo "Veuillez installer Java 17 ou supérieur"
    exit 1
fi
java -version

echo
echo "Vérification de Maven..."
if ! command -v mvn &> /dev/null; then
    echo "ERREUR: Maven n'est pas installé"
    echo "Veuillez installer Maven 3.6 ou supérieur"
    exit 1
fi
mvn --version

echo
echo "Installation des dépendances frontend..."
cd frontend
if ! npm install; then
    echo "ERREUR: Échec de l'installation des dépendances frontend"
    exit 1
fi

echo
echo "Configuration du frontend..."
if [ ! -f .env ]; then
    cp env.example .env
    echo "Fichier .env créé"
fi

echo
echo "Compilation du backend..."
cd ../backend
if ! mvn clean compile; then
    echo "ERREUR: Échec de la compilation du backend"
    exit 1
fi

echo
echo "========================================"
echo "Installation terminée avec succès !"
echo "========================================"
echo
echo "Prochaines étapes :"
echo "1. Configurez votre base de données MySQL"
echo "2. Modifiez backend/src/main/resources/application.yml"
echo "3. Lancez ./start-apps.sh pour démarrer les applications"
echo 