@echo off
echo ========================================
echo    NFC4Care Backend - Spring Boot
echo ========================================
echo.

echo Vérification de Java...
java -version
if %errorlevel% neq 0 (
    echo ERREUR: Java n'est pas installé ou n'est pas dans le PATH
    pause
    exit /b 1
)

echo.
echo Compilation du projet...
call mvn clean compile
if %errorlevel% neq 0 (
    echo ERREUR: Échec de la compilation
    pause
    exit /b 1
)

echo.
echo Démarrage de l'application...
echo L'application sera accessible sur: http://localhost:8080/api
echo.
echo Pour arrêter l'application, appuyez sur Ctrl+C
echo.

call mvn spring-boot:run

pause 