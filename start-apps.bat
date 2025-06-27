@echo off
echo ========================================
echo    NFC4Care - Démarrage complet
echo ========================================
echo.

echo Démarrage du backend Spring Boot...
start "NFC4Care Backend" cmd /k "cd backend && start.bat"

echo.
echo Attente du démarrage du backend...
timeout /t 10 /nobreak > nul

echo.
echo Démarrage du frontend React...
start "NFC4Care Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo Applications démarrées !
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8080/api
echo.
echo Utilisateur par défaut:
echo Email: doctor@example.com
echo Mot de passe: password
echo.
pause 