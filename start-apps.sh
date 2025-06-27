#!/bin/bash

echo "========================================"
echo "   NFC4Care - Démarrage complet"
echo "========================================"
echo

echo "Démarrage du backend Spring Boot..."
cd backend
./start.sh &
BACKEND_PID=$!

echo
echo "Attente du démarrage du backend..."
sleep 10

echo
echo "Démarrage du frontend React..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo
echo "Applications démarrées !"
echo
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8080/api"
echo
echo "Utilisateur par défaut:"
echo "Email: doctor@example.com"
echo "Mot de passe: password"
echo
echo "Appuyez sur Ctrl+C pour arrêter les applications"
echo

# Fonction pour nettoyer les processus
cleanup() {
    echo
    echo "Arrêt des applications..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturer Ctrl+C
trap cleanup SIGINT

# Attendre indéfiniment
wait 