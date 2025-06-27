@echo off
echo ========================================
echo    NFC4Care - Déploiement Docker
echo ========================================
echo.

echo Vérification de Docker...
docker --version
if %errorlevel% neq 0 (
    echo ERREUR: Docker n'est pas installé
    pause
    exit /b 1
)

echo.
echo Vérification de Docker Compose...
docker-compose --version
if %errorlevel% neq 0 (
    echo ERREUR: Docker Compose n'est pas installé
    pause
    exit /b 1
)

echo.
echo Arrêt des conteneurs existants...
docker-compose down

echo.
echo Construction des images...
docker-compose build --no-cache

echo.
echo Démarrage des services...
docker-compose up -d

echo.
echo Attente du démarrage des services...
timeout /t 30 /nobreak > nul

echo.
echo Vérification du statut des services...
docker-compose ps

echo.
echo ========================================
echo Déploiement terminé !
echo ========================================
echo.
echo Applications accessibles sur :
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8080/api
echo MySQL:    localhost:3306
echo.
echo Utilisateur par défaut :
echo Email: doctor@example.com
echo Mot de passe: password
echo.
echo Pour arrêter les services :
echo docker-compose down
echo.
pause 